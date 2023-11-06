import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateRoleDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  role_name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
}
