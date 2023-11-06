import { Module } from '@nestjs/common';
import { ProductMediaService } from './product-media.service';
import { ProductMediaController } from './product-media.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductMedia, ProductMediaSchema } from './models/product-media.model';
import { FilesService } from 'src/file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductMedia.name, schema: ProductMediaSchema },
    ]),
  ],
  controllers: [ProductMediaController],
  providers: [ProductMediaService, FilesService],
})
export class ProductMediaModule {}
