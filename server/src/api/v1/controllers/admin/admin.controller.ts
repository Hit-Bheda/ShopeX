import { Request, Response } from "express";
import { CategoryModel } from "../../models/category.model";
import { ProductModel } from "../../models/product.model";
import { AuthenticateRequest } from "../../types/types";
import { uploadOnCloudinary } from "../../utils/cloudinary.util";
import { LayoutModel } from "../../models/layout.model";

export const createCategory = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name) throw new Error("Please Provide Name!");

  const data = await CategoryModel.create({ name, description });

  res.status(200).json({ message: "Category Cretate Successfully!", data });
};

export const getCategories = async (req: Request, res: Response) => {
  const data = await CategoryModel.find();
  res.status(200).json(data);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await CategoryModel.findOneAndDelete({ _id: id });

  res.status(200).json({ message: "Item Deleted Successfully!", data });
};

export const getUser = async (req: AuthenticateRequest, res: Response) => {
  const user = req.user;

  res.status(200).json({ user });
};

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) throw new Error("File Not Found!");
  if (!req.file.buffer || req.file.buffer.length === 0)
    throw new Error("File Buffer Is Empty!");
  const url = await uploadOnCloudinary(req.file.buffer);
  res.status(200).json({ message: "File Uploaded Successfully!", url });
};

export const createProduct = async (req: Request, res: Response) => {
  console.log(req.body);
  const { images, name, category, description, quantity, price, sizes } =
    req.body;
  const data = await ProductModel.create({
    images,
    name,
    category,
    description,
    quantity,
    price,
    sizes,
  });
  res.status(200).json({ message: "Product Cretated Successfully!", data });
};

export const getProduct = async (req: Request, res: Response) => {
  let products = await ProductModel.find()
    .populate({
      path: "category",
      select: "name -_id", // Only select 'name' and exclude '_id'
    })
    .lean(); // Convert to plain JavaScript object
  res.status(200).json(products);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await ProductModel.findOneAndDelete({ _id: id });

  await LayoutModel.updateMany(
    { heroProducts: id },
    { $pull: { heroProducts: id } },
  );

  res.status(200).json({ message: "Item Deleted Successfully!", data });
};

export const setHeroProducts = async (req: Request, res: Response) => {
  const { product1, product2 } = req.body;
  if (!product1 || !product2) throw new Error("Products Required!");

  const existingLayout = await LayoutModel.findOne();
  let layout;

  if (existingLayout) {
    layout = await LayoutModel.findByIdAndUpdate(
      existingLayout._id,
      { heroProducts: [product1, product2] },
      { new: true },
    ).populate("heroProducts");
  } else {
    layout = await LayoutModel.create({
      heroProducts: [product1, product2],
      homeCategory: null,
    });
  }

  res.status(200).json({ message: "Product is setted successfully!" });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id, images, name, category, description, quantity, price, sizes } =
    req.body;
  const data = await ProductModel.findByIdAndUpdate(id, {
    images,
    name,
    category,
    description,
    quantity,
    price,
    sizes,
  });
  res.status(200).json({ message: "Product Updated Successfully!", data });
};
