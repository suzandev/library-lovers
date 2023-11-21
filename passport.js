import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import client from "./database.js";
import { ObjectId } from "mongodb";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        await client.connect();
        const userCollection = client.db("library-lover").collection("users");
        const user = await userCollection.findOne({
          email: profile._json.email,
        });

        if (user) {
          return cb(null, user);
        } else {
          const user = userCollection.insertOne({
            name: profile.displayName,
            email: profile._json.email,
            picture: profile._json.picture,
            role: "user",
          });
          return cb(null, user);
        }
      } catch (error) {
        console.error("Error connect to database", error);
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(async function (user, cb) {
  cb(null, user);
});
