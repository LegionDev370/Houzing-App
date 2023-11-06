import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class PropertyDetail {
  @Prop({
    default: uuid(),
  })
  unique_id: string;
  @Prop()
  rooms: number;
  @Prop()
  bathrooms: number;
  @Prop()
  bedrooms: number;
  @Prop()
  garage: number;
  @Prop()
  area: number;
  @Prop()
  garage_size: number;
  @Prop()
  property_status: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PropertyType',
  })
  property_type: string;
  @Prop()
  property_size: number;
  @Prop()
  build_year: Date;
}

export const PropertyDetailSchema =
  SchemaFactory.createForClass(PropertyDetail);
