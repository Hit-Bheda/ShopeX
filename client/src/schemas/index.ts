import { z } from "zod";

export const ProductResponseSchema = z.object({
  _id: z.string(),
  images: z.array(z.string().min(2, "Image Is Required!")),
  name: z.string().min(1, "Product name is required"),
  category: z.object({
    name: z.string(),
  }),
  description: z.string().optional(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(0.01, "Price must be at least 0.01"),
  sizes: z.array(z.string()).min(1, "Please Select Available Sizes!"),
});

export const CartSchema = z.object({
  productId: z.string(),
  productSize: z.string(),
  productQuantity: z.number(),
});

export const ShippingAddressSchema = z.object({
  streetAddress: z.string().min(1, { message: "Street address is required" }),
  streetAddress2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z
    .string()
    .regex(/^\d{5}$/, { message: "Zip code must be 5 digits" }),
  country: z.string().min(1, { message: "Country is required" }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, {
    message: "Phone format must be xxx-xxx-xxxx",
  }),
});
