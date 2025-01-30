import { errorLogger } from "../loggers/logger";
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
  errorLogger.error(err.message);

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
};
