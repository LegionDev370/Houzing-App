import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  login: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @ApiProperty({
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  confirm_password: string;
}
