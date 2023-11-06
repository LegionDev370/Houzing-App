import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CookieGetter } from 'src/decorators/cookie-getter';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: 'Register new user',
  })
  @ApiCreatedResponse()
  @Post('register')
  signUp(
    @Body() createUserDto: CreateUserDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    return this.authService.signUp(createUserDto, res);
  }
  @ApiOperation({
    summary: 'Login user',
  })
  @Post('login')
  @HttpCode(200)
  signIn(
    @Body() loginDto: LoginDto,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    return this.authService.signIn(loginDto, res);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout user',
  })
  @Post('logout')
  logout(
    @Res({ passthrough: true }) res: Response,
    @CookieGetter() refresh_token: string,
  ) {
    return this.authService.logout(res, refresh_token);
  }
}
