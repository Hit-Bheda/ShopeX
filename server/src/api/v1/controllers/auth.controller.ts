import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import * as argon2 from "argon2";
import { loginValidate } from "../utils/login-validate.util";
import { signupValidate } from "../utils/register-validate.util";
import jwt from "jsonwebtoken";
import config from "../../../configs/config";
import { infoLogger } from "../../../loggers/logger";

// Controller For Logining The Existing User!
export const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  // Perfrming Validation Of All Data
  const user = await loginValidate(username, email, password);
  const refreshToken = jwt.sign({ id: user.id }, config.secret);
  const accessToken = jwt.sign({ refreshToken }, config.secret);

  res
    .cookie("refreshToken", `${refreshToken}`, {
      secure: true,
      sameSite: "strict",
      httpOnly: true,
    })
    .status(200)
    .json({ message: "User Logged In Succesfully!", accessToken });
};

// Controller For Redistering New User!
export const signup = async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;
  // Performing Vlidation On All Data
  await signupValidate(name, username, email, password);
  const hashPass = await argon2.hash(password);
  const user = await UserModel.create({
    name,
    username,
    email,
    password: hashPass,
  });
  const refreshToken = jwt.sign({ id: user.id }, config.secret);
  const accessToken = jwt.sign({ refreshToken }, config.secret);

  res
    .cookie("refreshToken", `${refreshToken}`, {
      httpOnly: true,
      secure: true,
    })
    .status(200)
    .json({ message: "User Signed In Succesfully!", accessToken });
};

export const logout = (req: Request, res: Response) => {
  infoLogger.info("Logged Out!");
  res
    .clearCookie("refreshToken", {
      httpOnly: true,
      domain: "localhost",
    })
    .json({
      message: "Cookie Cleared!",
    });
};

export const isAuth = async (req: Request, res: Response) => {
  if (!req.cookies.refreshToken) return res.json({ isAuth: false });
  //const refreshToken = req.cookies.refreshToken;
  //const verify = jwt.verify(refreshToken,config.secret) as JwtPayload
  //if(!verify || typeof verify !== 'object' || !verify.id) res.json({isAuth:false})
  //const id = String((verify as JwtPayload)?.id)
  //console.log("id =",id)
  //if(!id) res.json({isAuth:false})
  //const data = await UserModel.findById(id)
  //if(!data) res.json({isAuth:false})
  res.json({ isAuth: true });
};
