import {
  IsOptional,
  IsString,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  login: string;
  @IsString()
  @IsOptional()
  first_name: string;
  @IsString()
  @IsOptional()
  last_name: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsStrongPassword()
  @IsOptional()
  password: string;
  @IsStrongPassword()
  @IsString()
  @IsOptional()
  confirm_password: string;
}
