import * as z from "zod"

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
    .min(6,{
        message: "Please Provide Atleast 6 Letters"
    })
})