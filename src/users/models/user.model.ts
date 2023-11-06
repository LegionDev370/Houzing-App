import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema({
  versionKey: false,
  timestamps: true,
})
export class User {
  @ApiProperty()
  @Prop({
    unique: true,
  })
  login: string;
  @ApiProperty()
  @Prop()
  first_name: string;
  @ApiProperty()
  @Prop()
  last_name: string;
  @ApiProperty()
  @Prop({
    unique: true,
  })
  email: string;
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: '6544ddc7809732865e2e3d8c',
  })
  @ApiProperty()
  role: string;
  @Prop()
  @ApiProperty()
  password: string;
  @Prop()
  @ApiProperty()
  hashed_refresh_token: string;
  @Prop()
  @ApiProperty()
  activation_link: string;
  @Prop({
    default: false,
  })
  @ApiProperty()
  is_verified: boolean;
  @Prop({
    default: true,
  })
  @ApiProperty()
  status: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
