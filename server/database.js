import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = process.env.DB_URI.replace("<password>", process.env.DB_PASS);
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;
