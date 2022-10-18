import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import exp from "constants";
import { Document } from "mongoose";
import { type } from "os";
import { Image, ImageSchema } from "./image-schema";

@Schema({
  timestamps: true,

  toJSON: {
    transform: (doc, ret, options) => {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
      delete ret.deleted;
    },
  },
})
export class User {
  _id?: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: ImageSchema })
  profileImage: Image;
}
export type UserDocument = User & Document<number>;
export const UserSchema = SchemaFactory.createForClass(User);
