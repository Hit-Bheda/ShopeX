import { Request, Response } from "express";
import { UserModel } from "../../models/user.model";
import * as argon2 from "argon2";
import { adminLoginValidate, adminSignupValidate } from "../../utils/admin-validate.util";
import jwt from "jsonwebtoken";
import config from "../../../../configs/config";
import { infoLogger } from "../../../../loggers/logger";

// Controller For Logining The Existing User!
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  infoLogger.info(email,password)
  // Perfrming Validation Of All Data
  const user = await adminLoginValidate(email, password);
  if(!user) return
  const refreshToken = jwt.sign({ id: user.id }, config.secret);
  const accessToken = jwt.sign({ refreshToken }, config.secret);

  res
    .cookie("refreshToken", `${refreshToken}`, {
      secure: true,
      sameSite: "strict",
      httpOnly: true,
    })
    .status(200)
    .json({ message: "Admin Logged In Succesfully!", accessToken });
};

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Performing Vlidation On All Data
  await adminSignupValidate(name, email, password);
  const hashPass = await argon2.hash(password);
  const user = await UserModel.create({
    name,
    email,
    password: hashPass,
    role: "admin"
  });

  res
    .status(200)
    .json({ message: "User Signed In Succesfully!", user });
};

export const accessToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    
    if(!refreshToken) throw new Error("Unauthorized User!")

    const accessToken = jwt.sign({ refreshToken }, config.secret);

  res
    .status(200)
    .json({ accessToken });
}

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

export const isAuth = (req: Request, res: Response) => {
    if(req.cookies.refreshToken) res.status(200).json({isAth: true})
    res
        .status(400)
        .json({ isAuth: false })
}