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
import morgan from "morgan";
import passport from "passport";
import * as path from "path";
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
    const userCollection = client.db("library-lover").collection("user");

    // Utils functions
    const sendToken = (id, res) => {
      const oneDay = 1000 * 60 * 60 * 24;

      console.log(process.env.JWT_LIFETIME, process.env.JWT_SECRET);

      const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
      });
    };

    const passwordCompare = async (password, hashedPassword) => {
      return await bcrypt.compare(password, hashedPassword);
    };

    // Middleware functions
    function isLoggedIn(req, res, next) {
      console.log(req.cookies);
      const token = req.cookies.token;

      if (token) {
        try {
          const payload = jwt.verify(token, process.env.JWT_SECRET);
          req.user.userId = payload.userId;
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
      const loggedUser = await userCollection.findOne({
        _id: req.user.userId,
      });

      const user = req.user.email ? req.user : loggedUser;

      res.status(StatusCodes.OK).json({
        user,
      });
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
        user: {
          name: newUser.name,
          email: newUser.email,
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

      if (!(await passwordCompare(passport, user.password))) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Invalid credentials",
        });
      }

      sendToken(user._id, res);
      res.status(StatusCodes.OK).json({
        user: {
          name: user.name,
          email: user.email,
          picture: user.picture,
          role: user.role,
        },
      });
    });

    app.post("/api/v1/auth/logout", (req, res) => {
      req.logout((err) => {
        if (err)
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "something went wrong!",
          });

        // res.cookie("token", "logout", {
        //   httpOnly: true,
        //   expires: new Date(Date.now()),
        // });

        res.status(StatusCodes.OK).json({
          message: "Unauthorized",
        });
      });
    });
  } catch (error) {
    console.error("Error connect to database", error);
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

// Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running ${process.env.NODE_ENV} server`);
  console.log(`Server is running on port ${PORT}`);
});
