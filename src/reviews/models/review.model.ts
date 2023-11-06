import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Review {
  @ApiProperty()
  @Prop()
  name: string;
  @ApiProperty()
  @Prop()
  email: string;
  @ApiProperty()
  @Prop()
  message: string;
  @ApiProperty()
  @Prop()
  date: Date;
  @ApiProperty()
  @Prop({
    default: 0,
  })
  cleanliness: number;
  @ApiProperty()
  @Prop({
    default: 0,
  })
  communication: number;
  @ApiProperty()
  @Prop({
    default: 0,
  })
  check_in: number;
  @ApiProperty()
  @Prop({
    default: 0,
  })
  accuracy: number;
  @ApiProperty()

  @Prop({
    default: 0,
  })
  location: number;
  @ApiProperty()
  @Prop({
    default: 0,
  })
  value: number;
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  product: string;
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: string;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
