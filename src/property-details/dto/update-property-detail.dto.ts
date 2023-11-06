import { IsOptional, IsString, IsNumber } from 'class-validator';
export class UpdatePropertyDetailDto {
  @IsString()
  @IsOptional()
  property_id: string;
  @IsNumber()
  @IsOptional()
  rooms: number;
  @IsNumber()
  @IsOptional()
  bathrooms: number;
  @IsNumber()
  @IsOptional()
  bedrooms: number;
  @IsNumber()
  @IsOptional()
  garage: number;
  @IsNumber()
  @IsOptional()
  area: number;
  @IsNumber()
  @IsOptional()
  garage_size: number;
  @IsString()
  @IsOptional()
  property_status: string;
  @IsString()
  @IsOptional()
  property_type: string;
  @IsNumber()
  @IsOptional()
  property_size: number;
  @IsString()
  @IsOptional()
  build_year: string;
}
