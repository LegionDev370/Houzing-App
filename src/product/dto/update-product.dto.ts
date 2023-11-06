import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty()
  @IsOptional()
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
  @IsOptional()
  country: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  region: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  city: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  category: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  user: string;
}
