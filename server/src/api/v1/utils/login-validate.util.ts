import { UserModel } from "../models/user.model";
import * as argon2 from "argon2";

// Validator For Login Data
export const loginValidate = async (
  username: string,
  email: string,
  password: string,
) => {
  if (!username && !email) throw new Error("Please Provide Email Or Username!");
  if (!password) throw new Error("Please Provide Password!");
  const data = await UserModel.findOne({ $or: [{ username }, { email }] });
  if (!data) throw new Error("User Doesn't Exists!");
  const verify = await argon2.verify(data.password, password);
  if (!verify) throw new Error("Invalid Password!");
  return data;
};
