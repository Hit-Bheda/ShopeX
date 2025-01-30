import { UserModel } from "../models/user.model";
import * as argon2 from "argon2";

import { validateEmail } from "../../../utils/validator.util";
import { LoginSchema, SignupSchema } from "../schemas";

// Validator For Login Data
export const loginValidate = async (
  email: string,
  password: string,
) => {

  // Validating The Credentials
  const validation = LoginSchema.safeParse({email,password})
  if(!validation.success) throw new Error(validation.error.errors[0].message)

  // Find the data in database
  const data = await UserModel.findOne({ email });
  if (!data) throw new Error("User Doesn't Exists!");

  // Verify the password
  const verify = await argon2.verify(data.password, password);
  if (!verify) throw new Error("Invalid Password!");

  // If the credentials are right then return the user data
  return data;
};

export const signupValidate = async (
  name: string,
  email: string,
  password: string,
) => {

  // Validating the Credentials 
  const validation = SignupSchema.safeParse({name,email,password})
  if(!validation.success) throw new Error(validation.error.errors[0].message)

  // Find user in database
  const isEmailExists = await UserModel.findOne({ email });
  if (isEmailExists) throw new Error("Email Already Exists!");
};