import { validateEmail } from "../../../utils/validator.util";
import { UserModel } from "../models/user.model";

// Validator For Signup Data
export const signupValidate = async (
  name: string,
  username: string,
  email: string,
  password: string,
) => {
  if (!name) throw new Error("Please Proide Name!");
  if (!username) throw new Error("Please Provide Username!");
  if (!email) throw new Error("Please Provide Email Address!");
  if (!password) throw new Error("Please Provide Password!");
  if (!validateEmail(email))
    throw new Error("Please Provide Valid Email Address!");
  const isUsernameExists = await UserModel.findOne({ username });
  if (isUsernameExists) throw new Error("Username Already Exists!");
  const isEmailExists = await UserModel.findOne({ email });
  if (isEmailExists) throw new Error("Email Already Exists!");
};
