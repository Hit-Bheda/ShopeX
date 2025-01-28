import { Request, Response } from "express";
import { ProductModel } from "../models/product.model";

export const sendProducts = async ( req: Request, res: Response) => {
  const products = await ProductModel.find()

  if(!products) return new Error("No Products Found!")

  res.status(200).json({products})
}

export const sendSingleProduct = async ( req: Request, res: Response ) => {
  const { id } = req.params

  const product = await ProductModel.findOne({id})

  if(!product) return new Error("Product Not Found!")

  res.status(200).json({product})
}