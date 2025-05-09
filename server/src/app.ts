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
    origin: (origin, callback) => {
      if (!origin || config.origin.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/v1", v1);
app.use(errorHandler);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

export default app;
