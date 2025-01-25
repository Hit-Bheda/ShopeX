import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "./get-error-message.util";

const TryCatch =
  (content: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await content(req, res);
    } catch (error) {
      next(res.status(500).send(getErrorMessage(error)));
    }
  };

export default TryCatch;
