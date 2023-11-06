import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateMessageDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  message: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  phone: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  email: string;
}
