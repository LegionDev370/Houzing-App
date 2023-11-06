import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role-decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all users',
  })
  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  findAllUser() {
    return this.usersService.findAllUser();
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user by id',
  })
  @Get(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user',
  })
  @Put(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('USER')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user',
  })
  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
  @ApiOperation({
    summary: 'activate user',
  })
  @Get('activate/:id')
  activateUser(@Param('id') param: string) {
    return this.usersService.activateUser(param);
  }
}
