import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

dotenv.config();
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27017/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;
