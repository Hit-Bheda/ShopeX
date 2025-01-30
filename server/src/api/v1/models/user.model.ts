import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: 0 },
})
export class userSchema {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true, lowercase: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ enum: ["user","admin"], default: "user"})
  public role!: "user" | "admin"

  @prop({ required: true, default: 0 })
  public verificationCode!: number;

  @prop({ default: null })
  public passwordResetCode!: number;

  @prop({ default: false, required: true })
  public isVerified!: boolean;
}

export const UserModel = getModelForClass(userSchema);
