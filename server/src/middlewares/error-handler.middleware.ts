import { ErrorRequestHandler } from "../types/types";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  console.log(err.message)
  res.status(statusCode);
  res.json({
    message: err.message,
  });
};
