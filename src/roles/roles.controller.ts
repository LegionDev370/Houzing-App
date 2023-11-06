import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role-decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('Role')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create role',
  })
  @Post('create')
  @UseGuards(RoleGuard)
  @Roles('SUPERADMIN')
  @UseGuards(AuthGuard)
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'add role',
  })
  @Post('add')
  @UseGuards(RoleGuard)
  @Roles('SUPERADMIN')
  @UseGuards(AuthGuard)
  addRolesToUser(@Body() addRoleDto: AddRoleDto) {
    return this.rolesService.addRoleToUser(addRoleDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get all roles',
  })
  @Get()
  @UseGuards(RoleGuard)
  @Roles('SUPERADMIN')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findAllRole() {
    return this.rolesService.findAllRoles();
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get one role',
  })
  @Get(':id')
  @UseGuards(RoleGuard)
  @Roles('SUPERADMIN')
  @UseGuards(AuthGuard)
  findOneRole(@Param('id') id: string) {
    return this.rolesService.findOneRole(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update role',
  })
  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('SUPERADMIN')
  @UseGuards(AuthGuard)
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole(id, updateRoleDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update user role',
  })
  @Put('user/update')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN')
  updateUserRole(@Body() role: AddRoleDto) {
    return this.rolesService.updateUserRole(role);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'remove role',
  })
  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('SUPERADMIN')
  @UseGuards(AuthGuard)
  removeRole(@Param('id') id: string) {
    return this.rolesService.removeRole(id);
  }
}
