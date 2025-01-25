import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../configs/config";
import { UserModel } from "../models/user.model";
import { PayloadType } from "../types/types";
import TryCatch from "../../../utils/try-catch.util";
import { getErrorMessage } from "../../../utils/get-error-message.util";

const UserVerifier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.cookies.refreshToken) throw new Error("Token Doesn't Exists");
    const refreshToken = req.cookies.refreshToken;
    const verify = jwt.verify(refreshToken, config.secret) as JwtPayload;
    if (!verify || typeof verify !== "object" || !verify.id)
      throw new Error("Invalid Token!");
    const id = String((verify as JwtPayload)?.id);
    if (!id) throw new Error("User Not Found!");
    const data = await UserModel.findById(id);
    if (!data) throw new Error("Invalid Token!");
    next();
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};

export default UserVerifier;
