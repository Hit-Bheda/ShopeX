import app from "./app";
import connectDB from "./db/connect-db";
import { infoLogger, errorLogger } from "./loggers/logger";

const startServer = async () => {
  try {
    await connectDB();
    infoLogger.info("Database connected successfully");
  } catch (error) {
    errorLogger.error("Database connection failed:", error);
  }
};

startServer();

// Export the app (Vercel will handle execution as a serverless function)
export default app;
