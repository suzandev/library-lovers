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
import { url } from "inspector";
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
        // User from session
        if (req.user._id) {
          return res.status(StatusCodes.OK).json({
            ...req.user,
            isAuthenticated: true,
          });
        }

        // User from database
        const loggedUser = await userCollection.findOne({
          _id: new ObjectId(req.user.userId),
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
        user: {
          name: user.name,
          email: user.email,
          picture: user.picture,
          role: user.role,
          isAuthenticated: true,
        },
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

        console.log(req.body);

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

        await bookCollection.insertOne({
          name,
          author,
          description,
          image: {
            public_id: imageUrl.public_id,
            url: imageUrl.secure_url,
          },
          category,
          quantity,
          rating,
        });

        res.status(StatusCodes.CREATED).json({
          message: "Book added successfully",
          book: {
            name,
            author,
            description,
            image: {
              public_id: imageUrl.public_id,
              url: imageUrl.secure_url,
            },
            category,
            quantity,
            rating,
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
        let result = bookCollection.find({ ...queries });

        // Find books where quantity gether than 0
        if (req.query.abo !== "null" && req.query.abo) {
          result = result.filter({ quantity: { $gt: "0" } });
        }

        // pagination
        result = result.skip(skip).limit(limit);

        // Execute query
        const books = await result.toArray();

        // get total books
        let total;
        if (req.query.abo !== "null" && req.query.abo) {
          const quantityQuery = { ...queries, quantity: { $gt: "0" } };
          total = await bookCollection.countDocuments(quantityQuery);
        } else {
          total = await bookCollection.countDocuments({ ...queries });
        }

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

    app.patch(
      "/api/v1/books/:id",
      isLoggedIn,
      permission("librarian"),
      async (req, res) => {
        const { id } = req.params;
        const { title, author, description, image, category } = req.body;
        const book = await bookCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              title,
              author,
              description,
              image,
              category,
            },
          }
        );

        if (!book) {
          return res.status(StatusCodes.NOT_FOUND).json({
            message: "Book not found",
          });
        }

        res.status(StatusCodes.OK).json({
          message: "Book updated successfully",
        });
      }
    );

    app.delete(
      "/api/v1/books/:id",
      isLoggedIn,
      permission("librarian"),
      async (req, res) => {
        const { id } = req.params;
        const book = await bookCollection.deleteOne({ _id: new ObjectId(id) });
        if (!book) {
          return res.status(StatusCodes.NOT_FOUND).json({
            message: "Book not found",
          });
        }
        res.status(StatusCodes.OK).json({
          message: "Book deleted successfully",
        });
      }
    );

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
