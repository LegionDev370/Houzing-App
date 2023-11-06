import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Request } from 'express';
import { Roles } from 'src/decorators/role-decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Favorite')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create favorite',
  })
  @Post('create/:id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  createFavorite(@Param() id: string, @Req() req: Request) {
    return this.favoritesService.createFavorite(id, req);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get all favorites',
  })
  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  findAllUserFavorites(@Req() req: Request) {
    return this.favoritesService.findAllFavorites(req);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get one favorite',
  })
  @Get(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  findOneFavorite(@Param('id') id: string) {
    return this.favoritesService.findOneFavorite(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'remove favorite',
  })
  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  remove(@Param('id') id: string) {
    return this.favoritesService.removeFavorite(id);
  }
}
