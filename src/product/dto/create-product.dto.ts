import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  location: {
    latitude: number;
    longitude: number;
  };
  @ApiProperty()
  @IsOptional()
  details: {
    rooms: number;
    bathrooms: number;
    garage: number;
    area: number;
    garage_size: number;
    property_status: string;
    property_type: string;
    property_size: number;
    build_year: string;
  };
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  region: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: string;
}
