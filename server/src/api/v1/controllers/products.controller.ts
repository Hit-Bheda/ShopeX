import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";
import { CategoryModel } from "../models/category.model";
import { LayoutModel } from "../models/layout.model";

export const sendProducts = async (req: Request, res: Response) => {
  const category = req.query.category;
  const limit = Number(req.query.limit) || 6;

  const categoryData = await CategoryModel.findOne({ name: category });
  if (!categoryData) throw new Error("Category Not Found!");

  const products = await ProductModel.find({
    category: categoryData._id,
  }).limit(limit);

  if (!products) return new Error("No Products Found!");

  res.status(200).json({ products });
};

export const sendSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await ProductModel.findOne({ id });

  if (!product) return new Error("Product Not Found!");

  res.status(200).json({ product });
};

export const getHomeProducts = async ( req: Request, res: Response ) => {
  const data = await LayoutModel.findOne().sort({ timestamp: -1 })
  res.status(200).json({data})
}