import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class ProductMedia {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  product: string;
  @Prop()
  file_path: string;
  @Prop()
  description: string;
  @Prop()
  data_uploaded: Date;
}
export const ProductMediaSchema = SchemaFactory.createForClass(ProductMedia);
