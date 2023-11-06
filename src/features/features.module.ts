import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema } from './models/feature.model';
import { Product, ProductSchema } from 'src/product/models/product.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feature.name, schema: FeatureSchema },
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [FeaturesController],
  providers: [FeaturesService],
})
export class FeaturesModule {}
