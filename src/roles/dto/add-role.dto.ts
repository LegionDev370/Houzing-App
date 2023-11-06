import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AddRoleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;
}
