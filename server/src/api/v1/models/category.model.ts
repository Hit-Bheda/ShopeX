import {
  getModelForClass,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";

@modelOptions({
  options: { allowMixed: 0 },
})
export class Category {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop()
  public description!: string;
}

export const CategoryModel = getModelForClass(Category);

