import { Request, Response } from "express"
import { CategoryModel } from "../../models/category.model"
import { ProductModel } from "../../models/product.model"
import { AuthenticateRequest } from "../../types/types"
import { uploadOnCloudinary } from "../../utils/cloudinary.util"

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

export const deleteCategory = async ( req: Request, res: Response) => {
    const id = req.params.id

    const data = await CategoryModel.findOneAndDelete({_id: id})

    res
    .status(200)
    .json({message: "Item Deleted Successfully!",data})
}

export const getUser = async ( req: AuthenticateRequest, res: Response ) => {
    const user = req.user

    res
    .status(200)
    .json({user})
}

export const uploadFile = async (req: Request, res: Response) => {
    if(!req.file?.destination ) throw new Error("File Not Found!")
    const url = await uploadOnCloudinary(req.file?.path);
    res.status(200).json({message: "File Uploaded Successfully!",url})
}