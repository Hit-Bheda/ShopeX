import { z } from "zod";

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
