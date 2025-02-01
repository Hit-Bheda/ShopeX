import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler.middleware";
import morgan from "morgan";
import { morganData, morganFormate } from "./loggers/morgan";
import v1 from "./api/v1";
import cookieParser from "cookie-parser";
import config from "./configs/config";

const app = express();

app.use(morgan(morganFormate, morganData));
app.use(express.json());
app.use(
  cors({
    origin: config.origin,
    credentials: true
  }),
);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "https://admin-shopex.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
      res.sendStatus(200);
  }
  
  next();
});

app.use(cookieParser());

app.use("/api/v1", v1);
app.use(errorHandler);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

export default app;
