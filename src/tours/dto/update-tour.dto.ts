import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class UpdateTourDto {
  @IsString()
  @IsOptional()
  date: string;
  @IsNumber()
  @IsOptional()
  time: number
  @IsString()
  @IsOptional()
  name: string;
  @IsString()
  @IsOptional()
  @IsPhoneNumber('UZ')
  phone_number: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  message: string;
  @IsString()
  @IsOptional()
  product: string;
}
