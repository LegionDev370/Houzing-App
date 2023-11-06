import { Controller, Param, Delete, Put } from '@nestjs/common';
import { ProductMediaService } from './product-media.service';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileUploadDto } from 'src/product/dto/file-upload.dto';
@ApiTags('ProductMedia')
@Controller('product')
export class ProductMediaController {
  constructor(private readonly productMediaService: ProductMediaService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update product file',
  })
  @Put('file/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of houses',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  updateMedia(@Param('id') id: string, @UploadedFile() file: any) {
    return this.productMediaService.updateMedia(id, file);
  }
  @ApiOperation({
    summary: 'remove file product',
  })
  @Delete('file/:id')
  removeMedia(@Param('id') id: string) {
    return this.productMediaService.removeMedia(id);
  }
}
