import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "./get-error-message.util";

const TryCatch =
  (handler: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

export default TryCatch;

