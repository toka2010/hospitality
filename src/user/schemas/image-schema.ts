import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { type } from "os";

@Schema({
  versionKey: false,
  _id: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.deleted;
    },
  },
})
export class Image {
  @Prop({ type: String })
  original?: string;

  @Prop({ type: String })
  thumbnail?: string;
}
export const ImageSchema= SchemaFactory.createForClass(Image);
