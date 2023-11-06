import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Category {
  @ApiProperty()
  @Prop()
  name: string;
  @ApiProperty()
  @Prop()
  description: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
