import { IsOptional, IsString } from 'class-validator';

export class UpdateProductMediaDto {
  @IsString()
  @IsOptional()
  product: string;
  @IsString()
  @IsOptional()
  file_path: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  data_uploaded: Date;
}
