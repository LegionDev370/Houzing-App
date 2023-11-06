import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreatePropertyDetailDto {
  @IsString()
  @IsNotEmpty()
  property_id: string;
  @IsNumber()
  @IsNotEmpty()
  rooms: number;
  @IsNumber()
  @IsNotEmpty()
  bathrooms: number;
  @IsNumber()
  @IsNotEmpty()
  bedrooms: number;
  @IsNumber()
  @IsNotEmpty()
  garage: number;
  @IsNumber()
  @IsNotEmpty()
  area: number;
  @IsNumber()
  @IsNotEmpty()
  garage_size: number;
  @IsString()
  @IsNotEmpty()
  property_status: string;
  @IsString()
  @IsNotEmpty()
  property_type: string;
  @IsNumber()
  @IsNotEmpty()
  property_size: number;
  @IsString()
  build_year: string;
}
