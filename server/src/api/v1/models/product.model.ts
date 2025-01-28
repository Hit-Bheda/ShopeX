import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: { timestamps: true },
    options: { allowMixed: 0 }
})
export class Product{
    @prop({ required: true })
    public name!: string

    @prop()
    public description!: string

    @prop()
    public thumbnail!:string

    @prop({ type: () => [String]})
    public images!: string[]

    @prop({ type: () => [String] })
    public sizes!: string[]

    @prop({ required: true })
    public quantity!: number

    @prop({ required: true })
    public price!: number

}

export const ProductModel =  getModelForClass(Product)