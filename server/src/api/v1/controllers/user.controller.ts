import { Request, Response } from "express";
import config from "../../../configs/config";
import jwt from "jsonwebtoken";
import { TokenRequest } from "../../../types/types";

export const forgotPassword = (req: Request, res: Response) => {
  res.json({ message: "Hello" });
};

export const accessToken = (req: TokenRequest, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  const accessToken = jwt.sign(refreshToken, config.secret);
  res.json({ accessToken }).status(200);
};
