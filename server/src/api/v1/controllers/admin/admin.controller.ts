import { Request, Response } from "express"
import { CategoryModel } from "../../models/category.model"
import { ProductModel } from "../../models/product.model"

export const createCategory = async ( req: Request, res: Response ) => {
    const { name, description } = req.body

    if(!name) throw new Error("Please Provide Name!")
    
    const data = await CategoryModel.create({name,description})

    res
    .status(200)
    .json({ message: "Category Cretate Successfully!",data })
}

export const getCategories = async ( req: Request, res: Response ) => {
    const data = await CategoryModel.find()
    res
    .status(200)
    .json(data)
}