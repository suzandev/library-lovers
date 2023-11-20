import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import session from "express-session";
import helmet from "helmet";
import hpp from "hpp";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import morgan from "morgan";
import multer from "multer";
import passport from "passport";
import * as path from "path";
import cloudinaryUpload from "./cloudinary.js";
import client from "./database.js";
import "./passport.js";

dotenv.config();
const origin = "http://localhost:5173";

// initializing app
const app = express();
app.set("trust proxy", 1);

// only when ready to deploy
// const dirname = path.dirname(process.argv[1]);
// app.use(express.static(path.resolve(dirname, "./client/dist")));

// Limit request from same api
const limit = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. please try again in an hour!",
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: origin }));
app.use(morgan("dev"));

// Security middleware
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(cookieParser());
app.use(hpp());
app.use(limit);

async function run() {
  try {
    // Connect the client to the server)
    await client.connect();
    const userCollection = client.db("library-lover").collection("users");
    const bookCollection = client.db("library-lover").collection("books");
    const reviewCollection = client.db("library-lover").collection("reviews");
    const borrowedBooksCollection = client
      .db("library-lover")
      .collection("borrowedBooks");

    // Utils functions
    const sendToken = (id, res) => {
      const oneDay = 1000 * 60 * 60 * 24;

      const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
      });
    };

    const passwordCompare = async (password, hashedPassword) =>
      await bcrypt.compare(password, hashedPassword);

    // Middleware functions
    async function isLoggedIn(req, res, next) {
      const token = req.cookies.token;
      if (req.user) {
        return next();
      }

      if (token) {
        try {
          const payload = jwt.verify(token, process.env.JWT_SECRET);
          req.user = { userId: payload.userId };

          return next();
        } catch (error) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Invalid token",
          });
        }
      }

      if (req.isAuthenticated()) {
        return next();
      }

      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
    }

    function permission(...roles) {
      return async (req, res, next) => {
        try {
          const loggedUser = await userCollection.findOne({
            _id: new ObjectId(req.user.userId || req.user?._id),
          });

          if (!loggedUser) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
              message: "Unauthorized",
            });
          }

          if (!roles.includes(loggedUser.role)) {
            return res.status(StatusCodes.FORBIDDEN).json({
              message: "You do not have permission to perform this action",
            });
          }
        } catch (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong",
          });
        }

        return next();
      };
    }

    async function isReviewed(req, res, next) {
      const userId = req.user?.userId || req.user?._id;
      const borrowId = req.params.borrowId;
      // const userId = "6559972c3ae09600322f1519";
      try {
        if (!borrowId) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please provide valid book",
          });
        }

        const borrowedBook = await borrowedBooksCollection.findOne({
          _id: new ObjectId(borrowId),
          userId: new ObjectId(userId),
        });

        if (!borrowedBook) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Book not borrowed",
          });
        }

        const review = await reviewCollection.findOne({
          bookId: new ObjectId(borrowedBook.bookId),
          userId: new ObjectId(userId),
        });

        if (!review) {
          return res.status(StatusCodes.OK).json({
            openForm: true,
          });
        }

        req.locals = {
          bookId: borrowedBook.bookId,
        };
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong!",
        });
      }
      return next();
    }

    async function returnBook(req, res, next) {
      const borrowId = req.params.borrowId;
      const bookId = req.locals?.bookId || req.params.bookId;

      try {
        // update borrowed book
        await borrowedBooksCollection.deleteOne({
          _id: new ObjectId(borrowId),
        });

        // update book quantity
        await bookCollection.updateOne(
          { _id: new ObjectId(bookId) },
          {
            $inc: {
              quantity: 1,
            },
          }
        );

        return next();
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong!",
        });
      }
    }

    async function reviewBook(req, res, next) {
      const { rating, comment } = req.body;
      const userId = req.user?.userId || req.user?._id;
      const bookId = req.params.bookId;
      // const userId = "6559972c3ae09600322f1519";
      try {
        if (!comment || !rating) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please provide comment and rating",
          });
        }

        await reviewCollection.insertOne({
          bookId: new ObjectId(bookId),
          userId: new ObjectId(userId),
          rating: parseInt(rating),
          comment,
        });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong!",
        });
      }

      return next();
    }

    // Passport login route
    app.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );
    app.get(
      "/auth/google/callback",
      passport.authenticate("google", {
        successRedirect: origin,
        failureRedirect: "/auth/login/failed",
      })
    );

    app.get("/auth/login/failed", (req, res) => {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: "failed to login",
      });
    });

    // User auth routes
    app.get("/api/v1/auth/user/me", isLoggedIn, async (req, res) => {
      try {
        // User from database
        const loggedUser = await userCollection.findOne({
          _id: new ObjectId(req.user.userId || req.user._id),
        });

        if (!loggedUser) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "The user belongs to this token does not exist!",
          });
        }

        res.status(StatusCodes.OK).json({
          ...loggedUser,
          isAuthenticated: true,
          password: undefined,
        });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong",
        });
      }
    });

    app.post("/api/v1/auth/register", async (req, res) => {
      const { email, name, password } = req.body;
      if (!email || !password || !name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "All fields are required",
        });
      }

      const user = await userCollection.findOne({
        email: email,
      });

      if (user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userCollection.insertOne({
        name: name,
        email: email,
        password: hashedPassword,
        role: "user",
      });

      sendToken(newUser.insertedId, res);

      res.status(StatusCodes.CREATED).json({
        message: "User created successfully",
        user: {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          picture: newUser.picture,
          isAuthenticated: true,
        },
      });
    });

    app.post("/api/v1/auth/login", async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "All fields are required",
        });
      }

      const user = await userCollection.findOne({
        email: email,
      });

      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "User Does not exists",
        });
      }

      if (!(await passwordCompare(password, user.password))) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email or password is incorrect",
        });
      }

      sendToken(user._id, res);
      res.status(StatusCodes.OK).json({
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
        isAuthenticated: true,
      });
    });

    app.post("/api/v1/auth/logout", (req, res) => {
      req.logout((err) => {
        if (err)
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "something went wrong!",
          });

        res.cookie("token", "logout", {
          httpOnly: true,
          expires: new Date(Date.now()),
        });

        res.status(StatusCodes.OK).json({
          message: "Logged out successfully!",
        });
      });
    });

    // Books routes
    app.post(
      "/api/v1/books",
      isLoggedIn,
      permission("librarian"),
      upload.single("image"),
      async (req, res) => {
        const { name, author, description, quantity, category, rating } =
          req.body;

        if (
          !name ||
          !author ||
          !description ||
          !category ||
          !rating ||
          !quantity
        ) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "All fields are required",
          });
        }

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

        const imageUrl = await cloudinaryUpload(dataURI);

        if (imageUrl.error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
          });
        }

        const newBook = await bookCollection.insertOne({
          name,
          author,
          description,
          image: imageUrl.secure_url,
          category,
          quantity: parseInt(quantity),
          rating: parseInt(rating),
        });

        res.status(StatusCodes.CREATED).json({
          message: "Book added successfully",
          book: {
            name: newBook.name,
            author: newBook.author,
            description: newBook.description,
            image: newBook.image,
            category: newBook.category,
            quantity: newBook.quantity,
            rating: newBook.rating,
          },
        });
      }
    );

    app.get("/api/v1/books", isLoggedIn, async (req, res) => {
      let queries = { ...req.query };

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const excludeFields = ["page", "limit", "abo"];
      excludeFields.forEach((item) => delete queries[item]);

      // if query value is null then remove from queries
      Object.keys(queries).forEach((item) => {
        if (queries[item] === "undefined") delete queries[item];
      });

      try {
        let result = bookCollection.aggregate([
          {
            $match: { ...queries },
          },
          {
            $lookup: {
              from: "reviews", // Assuming your reviews collection is named "reviews"
              localField: "_id", // Assuming the book's _id field matches with the reviews' bookId field
              foreignField: "bookId",
              as: "reviews",
            },
          },
          {
            $addFields: {
              rating: { $ifNull: [{ $avg: "$reviews.rating" }, 1] },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              author: 1,
              description: 1,
              image: 1,
              category: 1,
              quantity: 1,
              rating: 1,
            },
          },
          {
            $match: {
              $or: [
                { "reviews.rating": { $gt: 0 } }, // Filter books with reviews that have ratings greater than 0
                { reviews: { $exists: false } }, // Include books without reviews
              ],
            },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ]);

        const books = await result.toArray();

        // get total books
        const total = await bookCollection.countDocuments({ ...queries });

        // get total pages
        const pages = Math.ceil(total / limit);

        res.status(StatusCodes.OK).json({ books, total, pages });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong!",
        });
      }
    });

    app.get("/api/v1/books/:id", isLoggedIn, async (req, res) => {
      try {
        const { id } = req.params;
        const book = await bookCollection.findOne({ _id: new ObjectId(id) });

        res.status(StatusCodes.OK).json({
          book,
        });
      } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "No book found with this id",
        });
      }
    });

    app.get("/api/v1/slider/books", async (req, res) => {
      try {
        const books = await bookCollection
          .find({ quantity: { $gt: 0 } })
          .limit(4)
          .toArray();

        res.status(StatusCodes.OK).json({
          books,
        });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong!",
        });
      }
    });

    app.put(
      "/api/v1/books/:id",
      isLoggedIn,
      permission("librarian"),
      upload.single("image"),
      async (req, res) => {
        const { id } = req.params;
        const { name, author, description, category, quantity, rating } =
          req.body;

        console.log(description);

        try {
          if (
            !name ||
            !author ||
            !description ||
            !category ||
            !rating ||
            !quantity
          ) {
            return res.status(StatusCodes.BAD_REQUEST).json({
              message: "All fields are required",
            });
          }

          const book = await bookCollection.updateOne(
            { _id: new ObjectId(id) },
            {
              $set: {
                name,
                author,
                description,
                category,
                quantity: parseInt(quantity),
                rating: parseInt(rating),
              },
            }
          );

          if (!book) {
            return res.status(StatusCodes.NOT_FOUND).json({
              message: "Book not found",
            });
          }

          if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

            const imageUrl = await cloudinaryUpload(dataURI);

            if (imageUrl.error) {
              return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Something went wrong!",
              });
            }

            await bookCollection.updateOne(
              { _id: new ObjectId(id) },
              {
                $set: {
                  image: imageUrl.secure_url,
                },
              }
            );
          }

          res.status(StatusCodes.OK).json({
            message: "Book updated successfully",
          });
        } catch (error) {
          console.log(error);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
          });
        }
      }
    );

    app.get("/api/v1/books/:id/related", isLoggedIn, async (req, res) => {
      try {
        const bookId = req.params.id;

        // Find the details of the given book
        const book = await bookCollection.findOne(
          { _id: new ObjectId(bookId) },
          { projection: { category: 1, name: 1, author: 1 } }
        );

        // Check if the book is found
        if (!book) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: "Book not found" });
        }

        // Destructure the properties only if the book is not null
        const { category, name, author } = book;

        // Find related books with the same category, name, or author (excluding the current book)
        const relatedBooks = await bookCollection
          .find({
            _id: { $ne: new ObjectId(bookId) }, // Exclude the current book
            $or: [{ category: category }, { name: name }, { author: author }],
          })
          .limit(3)
          .toArray();

        res.status(StatusCodes.OK).json(relatedBooks);
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong!",
        });
      }
    });

    // Borrowed Book routes
    app.post("/api/v1/books/user/borrowed", isLoggedIn, async (req, res) => {
      const { bookId, returnDate, name, email } = req.body;
      const currentDate = new Date().toISOString().split("T")[0];

      const userId = req.user?.userId || req.user?._id;

      try {
        if (!bookId || !returnDate || !name || !email) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "All fields are required",
          });
        }

        if (!(returnDate >= currentDate)) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Return date must be greater than today's date",
          });
        }

        // check if book is already borrowed
        const borrowedBook = await borrowedBooksCollection.findOne({
          bookId: new ObjectId(bookId),
          userId: new ObjectId(userId),
        });

        if (borrowedBook) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Book already borrowed",
          });
        }

        // check if book is available
        const book = await bookCollection.findOne({
          _id: new ObjectId(bookId),
          quantity: { $gt: 0 },
        });

        if (!book) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Book not available",
          });
        }

        // insert borrowed book
        await borrowedBooksCollection.insertOne({
          bookId: new ObjectId(bookId),
          userId: new ObjectId(userId),
          name,
          email,
          borrowedDate: currentDate,
          returnDate,
        });

        // update book quantity
        await bookCollection.updateOne(
          { _id: new ObjectId(bookId) },
          {
            $inc: {
              quantity: -1,
            },
          }
        );

        res.status(StatusCodes.OK).json({
          message: "Book borrowed successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong!",
        });
      }
    });

    app.get("/api/v1/books/user/borrowed", isLoggedIn, async (req, res) => {
      const userId = req.user?.userId || req.user?._id;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      try {
        let result = await borrowedBooksCollection
          .aggregate([
            {
              $match: {
                userId: new ObjectId(userId),
              },
            },
            {
              $lookup: {
                from: "books",
                localField: "bookId",
                foreignField: "_id",
                as: "book",
              },
            },
            {
              $unwind: "$book",
            },
            {
              $project: {
                _id: 1,
                borrowedDate: 1,
                returnDate: 1,
                book: {
                  _id: 1,
                  name: 1,
                  author: 1,
                  image: 1,
                  category: 1,
                },
              },
            },
          ])
          .skip(skip)
          .limit(limit)
          .toArray(); // Move toArray here

        const total = await borrowedBooksCollection.countDocuments({
          userId: new ObjectId(userId),
        });

        // get total pages
        const pages = Math.ceil(total / limit);

        res.status(StatusCodes.OK).json({
          books: result,
          page,
          pages,
        });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong!",
        });
      }
    });

    app.post(
      "/api/v1/books/user/return/:borrowId",
      isLoggedIn,
      isReviewed,
      returnBook,
      async (req, res) => {
        res.status(StatusCodes.OK).json({
          message: "Book returned successfully",
        });
      }
    );

    // Reviews rating routes
    app.post(
      "/api/v1/books/user/review/:bookId/:borrowId",
      isLoggedIn,
      reviewBook,
      returnBook,
      (req, res) => {
        res.status(StatusCodes.OK).json({
          message: "Book returned successfully",
        });
      }
    );

    app.get("/api/v1/books/users/reviews", async (req, res) => {
      console.log(req.query.page);

      try {
        // Getting all user single latest review
        const page = Number(req.query.page) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;

        const result = reviewCollection.aggregate([
          {
            $sort: { createdAt: -1 }, // Sort reviews by createdAt field in descending order
          },
          {
            $group: {
              _id: "$userId", // Group reviews by userId
              review: { $first: "$$ROOT" }, // Get the first (latest) review in each group
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $project: {
              review: 1,
              user: {
                name: 1,
                picture: 1,
              },
            },
          },
          {
            $unwind: "$user",
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ]);

        const reviews = await result.toArray();

        // get total books
        const total = await reviewCollection.countDocuments();

        // get total pages
        const pages = Math.ceil(total / limit);

        res.status(StatusCodes.OK).json({
          reviews,
          page,
          pages,
        });
      } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong!",
        });
      }
    });

    // Not found route
    app.use("*", (req, res) => {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Route not found",
      });
    });
  } catch (error) {
    console.error("Error connect to database", error);
    // Ensures that the client will close when you finish/error
    await client.close();
    process.exit(1);
  }
}

run().catch(console.dir);

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running ${process.env.NODE_ENV} server`);
  console.log(`Server is running on port ${PORT}`);
});
