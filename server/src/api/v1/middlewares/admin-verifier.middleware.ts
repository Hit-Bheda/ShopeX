import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../configs/config";
import { UserModel } from "../models/user.model";
import { getErrorMessage } from "../../../utils/get-error-message.util";

const AdminVerifier = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Check If Reqest Hesder Exists Or Not If Exits Then Get It And Verify It If Not Then Throw Error
    if (!req.headers.authorization) throw new Error("Token Doesn't Exists");
    const accessToken = req.headers.authorization;
    const verify = jwt.verify(String(accessToken), config.secret) as JwtPayload;
    
    // Verify That The Access Token Conatins Refresh Token
    if (!verify || typeof verify !== "object" || !verify.refreshToken) throw new Error("Invalid Token!");

    // If Refresh Token Exists Then Extract It And Verify It Also
    const refreshToken = String((verify as JwtPayload)?.refreshToken);
    if (!refreshToken) throw new Error("Refresh Token Not Found!");
    const verifyAgain = jwt.verify(refreshToken,config.secret) as JwtPayload

    // Verify If The Refresh Token Contains Id Or Not
    if (!verifyAgain || typeof verifyAgain !== "object" || !verifyAgain.id) throw new Error("Invalid Token!");


    // If Id Exists Then Extract The Id And Find Admin Using id
    const id = String((verifyAgain as JwtPayload)?.id)
    if(!id) throw new Error("Id Not Found!")    
    const data = await UserModel.findById(id);
    if (!data) throw new Error("Invalid Token!");

    // Verify The Role Of The User
    if(data?.role != "admin") throw new Error("Unauthorized User!") 

    // If Evrything Is Alright Then Let User Access The API
    next();
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
};

export default AdminVerifier;
