import { getModelForClass, prop, modelOptions, Ref } from "@typegoose/typegoose";
import { Category } from "./category.model";

@modelOptions({
    schemaOptions: { timestamps: true },
    options: { allowMixed: 0 }
})
export class Product{
    @prop({ type: () => [String]})
    public images!: string[]

    @prop({ required: true })
    public name!: string

    @prop()
    public description!: string

    @prop({ ref: () => Category})
    public category!: Ref<Category>

    @prop({ type: () => [String] })
    public sizes!: string[]

    @prop({ required: true })
    public quantity!: number

    @prop({ required: true })
    public price!: number

}

export const ProductModel =  getModelForClass(Product)