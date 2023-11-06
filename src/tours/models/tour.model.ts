import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Tour {
  @ApiProperty()
  @Prop()
  date: Date;
  @ApiProperty()
  @Prop()
  time: string;
  @ApiProperty()
  @Prop()
  name: string;
  @ApiProperty()
  @Prop()
  phone_number: string;
  @ApiProperty()
  @Prop()
  email: string;
  @ApiProperty()
  @Prop()
  message: string;
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  from_user: string;
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  product: string;
  @ApiProperty()
  @Prop({
    default: true,
  })
  status: boolean;
}
export const TourSchema = SchemaFactory.createForClass(Tour);
