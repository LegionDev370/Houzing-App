import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorators/role-decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';
@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create product',
  })
  @Post('create')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'upload file',
  })
  @Post('upload/file/:id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of Houses',
    type: FileUploadDto,
  })
  uploadFile(
    @Param('id') id: string,
    @UploadedFile() file: Array<Express.Multer.File>,
  ) {
    return this.productService.uplaodFile(id, file);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get image product',
  })
  @Get('image/:id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  getImageProducts(@Param('id') id: string) {
    return this.productService.getImagesProduct(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'find all  product',
  })
  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  findAllProduct() {
    return this.productService.findAllProduct();
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'find one product',
  })
  @Get(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update product',
  })
  @Put(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'remove product',
  })
  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'activate product',
  })
  @Post('activate/:id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  activateProduct(@Param('id') id: string) {
    return this.productService.activateProduct(id);
  }
}
