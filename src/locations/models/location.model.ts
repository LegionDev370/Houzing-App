import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Location {
  @Prop()
  latitude: number;
  @Prop()
  longitude: number;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  product: string;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
