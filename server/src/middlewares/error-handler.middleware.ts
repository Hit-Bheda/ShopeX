import { errorLogger } from "../loggers/logger";
import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
  errorLogger.error(err.message);

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
};
