import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLocationDto {
  @IsNumber()
  @IsOptional()
  latitude: number;
  @IsNumber()
  @IsOptional()
  longitude: number;
}
