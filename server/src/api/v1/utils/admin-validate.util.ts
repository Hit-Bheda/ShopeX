import { UserModel, userSchema } from "../models/user.model";
import * as argon2 from "argon2"
import { validateEmail } from "../../../utils/validator.util";
import { LoginSchema, SignupSchema } from "../schemas";
import { getErrorMessage } from "../../../utils/get-error-message.util";

export const adminLoginValidate = async (
  email: string,
  password: string
) => {

  try{
  // Validating the credentials
  const validation = LoginSchema.safeParse({email, password})
  if(!validation.success) throw new Error(validation.error.errors[0].message)

  // Finding the user in database
  const data = await UserModel.findOne({ email });
  if (!data) throw new Error("User Doesn't Exists!");

  // Verifyig the role of the user
  if (data.role != "admin") throw new Error("Invalid User");

  // Vrifying the password
  const verify = await argon2.verify(data.password, password);
  if (!verify) throw new Error("Invalid Password!");
  
  // If validation is passed then return the data
  return data;
} catch(error){
  throw new Error(getErrorMessage(error) || "Validation Failed!")
}
};


export const adminSignupValidate = async (
  name: string,
  email: string,
  password: string
) => {

  // Validating the credentials
  const validation = SignupSchema.safeParse({name,email, password})
  if(!validation.success) throw new Error(validation.error.errors[0].message)

  // Finding the user in database
  const data = await UserModel.findOne({ email });
  if (data) throw new Error("User Alredy Exists!");
  
};