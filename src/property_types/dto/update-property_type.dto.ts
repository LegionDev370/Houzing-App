import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdatePropertyTypeDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;
}
