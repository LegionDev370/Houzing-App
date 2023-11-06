import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class Role {
  @ApiProperty()
  @Prop()
  role_name: string;
  @ApiProperty()
  @Prop()
  description: string;
}
export const RoleSchema = SchemaFactory.createForClass(Role);
