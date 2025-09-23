import mongoose from "mongoose";
import { env } from "../utils/env.js";

export const initMongoDB = async () => {
  const MONGO_USER = env("MONGODB_USER");
  const MONGO_PASSWORD = env("MONGODB_PASSWORD");
  const MONGO_URL = env("MONGODB_URL");
  const MONGO_DBNAME = env("MONOGODB_DBNAME");
  const mongoUri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DBNAME}?retryWrites=true&w=majority&appName=SlimMoms`;

  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Mongo connection successfully established!👍🏻");
  } catch (error) {
    console.error("❌ MongoDB connection error 👎🏻:", error.message);
    process.exit(1);
  }
};
export default initMongoDB;
