import { RequestHandler, Request, Response, NextFunction } from "express";

export interface ErrorResponse {
  message: string;
  stack?: string;
}

export interface headerType {
  refreshToken: string;
}
export interface TokenRequest extends Request {
  refreshToken: string;
}

export interface Route {
  path: string;
  method: "get" | "post" | "put" | "delete";
  handler: (req: TokenRequest, res: Response, next: NextFunction) => void;
}

export type ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
) => void;
