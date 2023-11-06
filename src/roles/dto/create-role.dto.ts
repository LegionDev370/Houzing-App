import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  role_name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
