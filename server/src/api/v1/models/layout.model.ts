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
  @Prop({ ref: () => Product })
  public heroProducts!: Ref<Product>[];

  @Prop({ ref: () => Category })
  public homeCategory!: Ref<Category>;
}

export const LayoutModel = getModelForClass(Layout);
