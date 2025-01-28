import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Product } from "./product.model";


@modelOptions({
    options: { allowMixed: 0}
})
class Category{
    @prop()
    public name!: string

    @prop({ type: () => Product})
    public products!: Ref<Product>[]
}

export const CategoryModel = getModelForClass(Category)