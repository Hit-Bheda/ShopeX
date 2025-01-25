import mongoose from "mongoose";
import config from "../configs/config";
import { errorLogger, infoLogger } from "../loggers/logger";

export async function connectDB() {
  try {
    const mongoURI: string = config.mongoURI;

    await mongoose.connect(mongoURI);
    infoLogger.info("Connected to MongoDB");
  } catch (error) {
    errorLogger.error(error);
  }
}

export default connectDB;
