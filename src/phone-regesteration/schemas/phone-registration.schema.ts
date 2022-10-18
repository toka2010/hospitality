import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { type } from "os";

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret, option) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.deleted;
      delete ret.__v;
    },
  },
})
export class PhoneRegistration {
  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  otp: string;

  @Prop({ type: Boolean, default: false })
  verified: boolean;
}
export type PhoneRegistrationDocument = PhoneRegistration & Document<number>;
export const PhoneRegistrationSchema =
  SchemaFactory.createForClass(PhoneRegistration);
