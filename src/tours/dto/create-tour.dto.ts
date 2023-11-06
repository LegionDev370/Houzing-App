import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTourDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  date: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  time: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
}
