import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PropertyTypesService } from './property_types.service';
import { CreatePropertyTypeDto } from './dto/create-property_type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property_type.dto';
import { Roles } from 'src/decorators/role-decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('PropertyType')
@Controller('property-types')
export class PropertyTypesController {
  constructor(private readonly propertyTypesService: PropertyTypesService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create property type',
  })
  @Post('/create')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  createPropertyType(@Body() createPropertyTypeDto: CreatePropertyTypeDto) {
    return this.propertyTypesService.createPropertyType(createPropertyTypeDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get all property types',
  })
  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  findAllPropertyTypes() {
    return this.propertyTypesService.findAllPropertyType();
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get property type by id',
  })
  @Get(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  findOnePropertyType(@Param('id') id: string) {
    return this.propertyTypesService.findOnePropertyType(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update property type',
  })
  @Put(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  updatePropertyType(
    @Param('id') id: string,
    @Body() updatePropertyTypeDto: UpdatePropertyTypeDto,
  ) {
    return this.propertyTypesService.updatePropertyType(
      id,
      updatePropertyTypeDto,
    );
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'remove property type',
  })
  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  removePropertyType(@Param('id') id: string) {
    return this.propertyTypesService.removePropertyType(id);
  }
}
