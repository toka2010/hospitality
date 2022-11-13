import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { type } from "os";

@Schema({
  timestamps: true,
  toJSON: {
    transform: (docs, ret, options) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.deleted;
    },
  },
})
export class Admin {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  phone: string;
}

export type AdminDocument = Admin & Document<number>;
export const AdminSchema = SchemaFactory.createForClass(Admin);
