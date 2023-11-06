import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role-decorator';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Tour')
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create tour',
  })
  @Post('create/:id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  createTour(
    @Param('id') id: string,
    @Body() createTourDto: CreateTourDto,
    @Req() req: Request,
  ) {
    return this.toursService.createTour(createTourDto, id, req);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get all tours',
  })
  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  findAllTours() {
    return this.toursService.findAllTours();
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get one tour',
  })
  @Get(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  findOneTours(@Param('id') id: string) {
    return this.toursService.findOneTours(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update tour',
  })
  @Put(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.updateTour(id, updateTourDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'remove tour',
  })
  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  removeTour(@Param('id') id: string) {
    return this.toursService.removeTour(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get tours user',
  })
  @Get('user/:id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  getToursUser(@Param('id') id: string) {
    return this.toursService.getToursUser(id);
  }
}
