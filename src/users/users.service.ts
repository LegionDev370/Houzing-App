import {
  BadRequestException,
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.model';
import mongoose, { Model } from 'mongoose';
import { Role } from 'src/roles/models/role.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
  ) {}
  async findAllUser() {
    const users = await this.userModel.find().populate('role');
    if (users.length >= 1) {
      return users;
    }
    throw new NotFoundException('users not found');
  }
  async findOneUser(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const user = await this.userModel.findById(id).populate('role');
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {
        new: true,
      },
    );
    if (updatedUser) {
      return updatedUser;
    }
    throw new NotFoundException('user not found');
  }

  async removeUser(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const data = await this.userModel.findByIdAndRemove(id);
    if (!data) {
      throw new NotFoundException('user not found');
    }
    return {
      message: 'success',
    };
  }
  async activateUser(param: string) {
    try {
      const findUser = await this.userModel.findOne({
        activation_link: param,
        is_verified: false,
      });
      if (findUser) {
        const updatedUser = await this.userModel.findOneAndUpdate(
          {
            activation_link: param,
            is_verified: false,
          },
          {
            is_verified: true,
          },
          {
            new: true,
          },
        );
        if (updatedUser == null) {
          throw new NotFoundException('user not found');
        }
        return {
          message: 'user activited',
        };
      }
      throw new HttpException('user already activated', HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
