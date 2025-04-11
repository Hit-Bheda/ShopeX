import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "./get-error-message.util";
import { errorLogger } from "../loggers/logger";

const TryCatch =
  (handler: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      const message: String = String(getErrorMessage(error));
      errorLogger.error(message);
      res.status(500).json({ message: message });
    }
  };

export default TryCatch;
