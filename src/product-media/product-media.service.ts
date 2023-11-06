import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateProductMediaDto } from './dto/update-product-media.dto';
import mongoose, { Model, mongo } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductMedia } from './models/product-media.model';
import { unlinkSync } from 'fs';
import { FilesService } from 'src/file/file.service';
@Injectable()
export class ProductMediaService {
  constructor(
    @InjectModel(ProductMedia.name)
    private readonly productMedia: Model<ProductMedia>,
    private readonly fileService: FilesService,
  ) {}
  async updateMedia(id: string, file: any) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const findMedia = await this.productMedia.findOne({ product: id });
      const oldFile = findMedia.file_path;
      console.log(oldFile);
      unlinkSync(`${process.cwd()}/dist/static/${oldFile}`);
      const newFile = await this.fileService.createFile(file);
      const updateMedia = await this.productMedia.findOneAndUpdate(
        {
          product: id,
        },
        {
          file_path: newFile,
          data_uploaded: new Date(),
        },
      );
      if (updateMedia == null) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      return {
        message: 'success',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async removeMedia(id: string) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const findMedia = await this.productMedia.findOneAndDelete({
        product: id,
      });
      if (findMedia == null) {
        throw new HttpException('media not found', HttpStatus.BAD_REQUEST);
      }
      return {
        message: 'success',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
