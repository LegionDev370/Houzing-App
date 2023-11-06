import {
  HttpException,
  HttpStatus,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { JwtPayloadType } from './types/jwt-payload.type';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/models/user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async signUp(createUserDto: CreateUserDto, res: Response) {
    const findUser = await this.userModel.findOne({
      login: createUserDto.login,
    });
    if (findUser) {
      throw new HttpException(
        'user already registred',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const findUserEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (findUserEmail) {
      throw new HttpException(
        'user already registred',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (findUser == null && findUserEmail == null) {
      if (createUserDto.password !== createUserDto.confirm_password) {
        throw new HttpException(
          'confirm password is invalid',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
      const activationLink = uuid();
      const newUser = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
        activation_link: activationLink,
      });
      const { refresh_token } = await this.generateToken(newUser.id);
      const hashed_refresh_token = await bcrypt.hash(refresh_token, 9);
      const updateUser = await this.userModel.findByIdAndUpdate(
        newUser.id,
        {
          hashed_refresh_token,
        },
        {
          new: true,
        },
      );
      if (updateUser) {
        const tokens = await this.generateToken(updateUser.id);
        try {
          await this.mailService.sendUserConfirmationMail(updateUser);
        } catch (error) {}
        res.cookie('refresh_token', tokens.refresh_token, {
          httpOnly: true,
          maxAge: 15 * 24 * 60 * 60 * 1000,
        });
        return {
          message: 'User registred successfully',
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        };
      }
    }
    throw new HttpException('user already exists', HttpStatus.UNAUTHORIZED);
  }

  async generateToken(userId: string) {
    const payload: JwtPayloadType = {
      sub: userId,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
  async signIn(loginDto: LoginDto, res: Response) {
    try {
      const user = await this.userModel.findOne({
        login: loginDto.login,
      });
      if (!user) {
        throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
      }
      const checkPassword = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!checkPassword) {
        throw new HttpException(
          'invalid login or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const { access_token, refresh_token } = await this.generateToken(user.id);
      const hashed_refresh_token = await bcrypt.hash(refresh_token, 12);
      const updatedUser = await this.userModel.findOneAndUpdate(
        {
          _id: user.id,
        },
        {
          hashed_refresh_token,
        },
        {
          new: true,
        },
      );
      if (updatedUser == null) {
        throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);
      }
      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async logout(res: Response, refresh_token: string) {
    try {
      const user = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      if (!user) {
        throw new ForbiddenException('user not found');
      }
      const findUser = await this.userModel.findOneAndUpdate(
        {
          id: user.id,
        },
        {
          hashed_refresh_token: null,
        },
        {
          new: true,
        },
      );
      if (findUser) {
        res.clearCookie('refresh_token');
        return {
          message: 'User logged out successfully',
        };
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
