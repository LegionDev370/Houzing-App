import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateFeatureDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  air_condition: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  lawn: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  refrigerator: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  washer: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  barbeque: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  laundry: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  sauna: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  wifi: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  dryer: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  microwave: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  swimming_pool: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  window_coverings: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  gym: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  outdoor_shower: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  tv_cable: boolean;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  dining_room: boolean;
  @ApiProperty()
  @IsString()
  @IsOptional()
  house: string;
}
