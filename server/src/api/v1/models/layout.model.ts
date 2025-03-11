import {
  getModelForClass,
  Ref,
  modelOptions,
  Prop,
} from "@typegoose/typegoose";
import { Category } from "./category.model";

modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: 0 },
});
export class Layout {
  @Prop({ type: () => [String], required: true })
  public heroProducts!: string[];

  @Prop({ ref: () => Category, required: true })
  public homeCategory!: Ref<Category>;
}

export const LayoutModel = getModelForClass(Layout);
