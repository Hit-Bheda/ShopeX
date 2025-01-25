import dotenv from "dotenv";
import { errorLogger } from "../loggers/logger";

dotenv.config();

type configType = {
  port: number;
  mongoURI: string;
  secret: string;
};

const config: configType = {
  port: parseInt(process.env.PORT || "5000"),
  mongoURI: process.env.MONGODB_URI || "",
  secret: process.env.SECRET || "",
};

if (!config.mongoURI) {
  errorLogger.error("MongoDB URI is missing. Please add it to your .env file.");
}

export default config;
