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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Query } from '@nestjs/common/decorators/http';
import { Roles } from 'src/decorators/role-decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create Category',
  })
  @Post('create')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find All Category',
  })
  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  findAllCategory() {
    return this.categoryService.findAllCategory();
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find Product By Category',
  })
  @Get('product')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  async getProductByCategory(@Query('name') query: string) {
    return this.categoryService.getProductsByCategory(query);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Find One Category',
  })
  @Get(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  findOneCategory(@Param('id') id: string) {
    return this.categoryService.findOneCategory(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update Category',
  })
  @Put(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove Category',
  })
  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  removeCategory(@Param('id') id: string) {
    return this.categoryService.removeCategory(id);
  }
}
