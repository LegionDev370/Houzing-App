import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  cleanliness: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  communication: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  check_in: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  accuracy: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  location: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  value: number;
}
