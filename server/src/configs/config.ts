import dotenv from "dotenv";
import { errorLogger } from "../loggers/logger";

dotenv.config();

type configType = {
  port: number;
  mongoURI: string;
  secret: string;
  origin: string;
  cloudinaryCloudName: string;
  cloundinaryApiKey: string;
  cloudinaryApiSecret: string;
};

const config: configType = {
  port: parseInt(process.env.PORT || "5000"),
  mongoURI: process.env.MONGODB_URI || "",
  secret: process.env.SECRET || "",
  origin: process.env.ORIGIN || "http://localhost:5173",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloundinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || ""
};

if (!config.mongoURI) {
  errorLogger.error("MongoDB URI is missing. Please add it to your .env file.");
}

export default config;
