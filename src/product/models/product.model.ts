import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Product {
  @ApiProperty()
  @Prop()
  name: string;
  @ApiProperty()
  @Prop()
  description: string;
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  })
  location: string;
  @ApiProperty()
  @Prop()
  country: string;
  @ApiProperty()
  @Prop()
  region: string;
  @ApiProperty()
  @Prop()
  city: string;
  @ApiProperty()
  @Prop()
  address: string;
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: string;
  @ApiProperty()
  @Prop()
  price: number;
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: string;
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PropertyDetail',
  })
  details: string;
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feature',
    default: '654283ae50544e4ec5967751',
  })
  features: string;
  @ApiProperty()
  @Prop({
    default: true,
  })
  status: boolean;
  @ApiProperty()
  @Prop({
    default: false,
  })
  is_verified: boolean;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
