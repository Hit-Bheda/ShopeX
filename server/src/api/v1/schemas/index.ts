import * as z from "zod";

export const SignupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Please provide a valid name." }),

  email: z
    .string()
    .min(1, { message: "Please provide an email address." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});

export const LoginSchema = z.object({
    email: z
    .string()
    .min(1,{
        message: "Please Provide An Email Address!"
    })
    .email({
        message: "Please Provide Valid Email Address!"
    }),
    
    password: z
    .string()
    .min(1,{
        message: "Please Provide Password!"
    })
    .min(6,{
        message: "Please Provide Atleast 6 Letters!"
    })
})