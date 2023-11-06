import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './models/role.model';
import mongoose, { Model } from 'mongoose';
import { AddRoleDto } from './dto/add-role.dto';
import { User } from 'src/users/models/user.model';
import { UserRoles } from './models/user-roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<Role>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(UserRoles.name)
    private readonly userRolesModel: Model<UserRoles>,
  ) {}
  async createRole(createRoleDto: CreateRoleDto) {
    const findRole = await this.roleModel.findOne({
      role_name: createRoleDto.role_name,
    });
    if (!findRole) {
      const newRole = new this.roleModel(createRoleDto);
      newRole.save();
      return newRole;
    }
    throw new HttpException('role already exists', HttpStatus.BAD_REQUEST);
  }
  async addRoleToUser(addRoleDto: AddRoleDto) {
    const findUser = await this.userModel.findById(addRoleDto.user);
    const findRole = await this.roleModel.findById(addRoleDto.role);
    if (findUser == null) {
      throw new BadRequestException('user not found');
    }
    if (findRole == null) {
      throw new BadRequestException('role not found');
    }
    const findUserRoles = await this.userRolesModel.findOne({
      user: addRoleDto.user,
      role: addRoleDto.role,
    });
    if (findUserRoles == null) {
      const newUserRoles = await this.userRolesModel.create({
        user: addRoleDto.user,
        role: addRoleDto.role,
      });
      const updatedUser = await this.userModel.findByIdAndUpdate(
        findUser.id,
        { role: newUserRoles.role },
        {
          new: true,
        },
      );
      if (updatedUser == null) {
        throw new BadRequestException('user not found');
      }
      return {
        message: 'role added successfully',
      };
    }
    throw new HttpException('role alreay added', HttpStatus.BAD_REQUEST);
  }

  async updateUserRole(role: AddRoleDto) {
    try {
      const findUser = await this.userModel.findById(role.user);
      const findRole = await this.roleModel.findById(role.role);
      if (findUser == null) {
        throw new BadRequestException('user not found');
      }
      if (findRole == null) {
        throw new BadRequestException('role not found');
      }
      const findUserRoles = await this.userRolesModel.findOne({
        user: role.user,
      });
      const updatedRole = await this.userRolesModel.findByIdAndUpdate(
        findUserRoles.id,
        role,
        {
          new: true,
        },
      );
      if (updatedRole == null) {
        throw new BadRequestException('role not found');
      }
      return {
        message: 'success',
        data: updatedRole,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllRoles() {
    const roles = await this.roleModel.find();
    if (roles.length >= 1) {
      return roles;
    }
    throw new HttpException('roles not found', HttpStatus.NOT_FOUND);
  }

  async findOneRole(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const role = await this.roleModel.findById(id);
    if (role) {
      return {
        data: role,
      };
    }
    throw new HttpException('role not found', HttpStatus.NOT_FOUND);
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const updatedRole = await this.roleModel.findByIdAndUpdate(
      id,
      updateRoleDto,
      {
        new: true,
      },
    );
    if (updatedRole) {
      return updatedRole;
    }
    throw new HttpException('role not found', HttpStatus.NOT_FOUND);
  }

  async removeRole(id: string) {
    const data = await this.roleModel.findByIdAndRemove(id);
    if (data) {
      return {
        message: 'success',
      };
    }
    throw new HttpException('role not found', HttpStatus.NOT_FOUND);
  }
}
