import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Please Provide An Email Address!",
    })
    .email({
      message: "Please Provide Valid Email Address!",
    }),

  password: z.string().min(6, {
    message: "Please Provide Atleast 6 Letters",
  }),
});

export const ProductSchema = z.object({
  images: z.array(z.string().min(1, "Image Is Required!")),
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(0.01, "Price must be at least 0.01"),
  sizes: z.array(z.string()).min(1, "Please Select Available Sizes!"),
});

export const ProductResponseSchema = z.object({
  _id: z.string(),
  images: z.array(z.string().min(1, "Image Is Required!")),
  name: z.string().min(1, "Product name is required"),
  category: z.object({
    name: z.string(),
  }),
  description: z.string().optional(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(0.01, "Price must be at least 0.01"),
  sizes: z.array(z.string()).min(1, "Please Select Available Sizes!"),
});

export const EditProductSchema = z.object({
  _id: z.string(),
  images: z.array(z.string().min(1, "Image Is Required!")),
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(0.01, "Price must be at least 0.01"),
  sizes: z.array(z.string()).min(1, "Please Select Available Sizes!"),
});

