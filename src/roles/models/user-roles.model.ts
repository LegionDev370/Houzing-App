import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema({
  versionKey: false,
})
export class UserRoles {
  @ApiProperty()
  @Prop()
  user: string;
  @ApiProperty()
  @Prop()
  role: string;
}
export const UserRoleSchema = SchemaFactory.createForClass(UserRoles);
