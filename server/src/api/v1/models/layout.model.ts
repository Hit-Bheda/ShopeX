import {
  getModelForClass,
  Ref,
  modelOptions,
  Prop,
} from "@typegoose/typegoose";
import { Category } from "./category.model";
import { Product } from "./product.model";

modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: 0 },
});
export class Layout {
  @Prop({ type: () => [Product], required: true })
  public heroProducts!: Product[];

  @Prop({ ref: () => Category, required: true })
  public homeCategory!: Ref<Category>;
}

export const LayoutModel = getModelForClass(Layout);
