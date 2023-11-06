import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Feature } from './models/feature.model';
import mongoose, { Model } from 'mongoose';
import { Product } from 'src/product/models/product.model';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectModel(Feature.name) private readonly featuresModel: Model<Feature>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async create(createFeatureDto: CreateFeatureDto) {
    const data = await this.featuresModel.create(createFeatureDto);
    if (data) {
      return {
        message: 'success',
      };
    }
  }
  async updateFeaturesProduct(createFeatureDto: CreateFeatureDto, id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const findProduct = await this.productModel.findById(id);
    if (findProduct == null) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
    const findFeature = await this.featuresModel.findByIdAndUpdate(
      findProduct.features,
      createFeatureDto,
      {
        new: true,
      },
    );
    if (findFeature == null) {
      throw new HttpException('feature not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Success',
    };
  }
}
