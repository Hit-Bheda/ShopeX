import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Product } from "./product.model";


@modelOptions({
    options: { allowMixed: 0}
})
export class Category{
    @prop({ required: true, unique: true })
    public name!: string

    @prop()
    public description!: string
}

export const CategoryModel = getModelForClass(Category)