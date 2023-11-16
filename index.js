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
const dirname = path.dirname(process.argv[1]);
app.use(express.static(path.resolve(dirname, "./client/dist")));

// Limit request from same api
const limit = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP. please try again in an hour!",
});

// middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
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

    app.get("/auth/user/me", (req, res) => {
      if (req.user) {
        res.status(StatusCodes.OK).json({
          user: req.user,
        });
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: "please login",
        });
      }
    });

    app.post("/auth/logout", (req, res, next) => {
      req.logout((err) => {
        if (err)
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "something went wrong!",
          });
      });
      res.status(StatusCodes.OK).json({
        message: "user logged out",
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
