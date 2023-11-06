import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite } from './models/favorite.model';
import mongoose, { Model } from 'mongoose';
import { Product } from 'src/product/models/product.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private readonly faviroteModel: Model<Favorite>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async createFavorite(data: any, req: Request) {
    try {
      if (!mongoose.isValidObjectId(data)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const { id } = data;
      const user = req['user'];
      const findProduct = await this.productModel.findById(id);
      if (findProduct == null) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      const findProductFavorite = await this.faviroteModel.findOne({
        product: id,
      });
      if (findProductFavorite != null) {
        throw new HttpException(
          'Product already in favorite',
          HttpStatus.CONFLICT,
        );
      }
      const newFavorite = new this.faviroteModel({
        user: user,
        product: id,
      });
      const result = await newFavorite.save();
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllFavorites(req: Request) {
    try {
      const user = req['user'];
      const favorites = await this.faviroteModel
        .find(
          { user: user },
          {
            user: 0,
          },
        )
        .populate({
          path: 'product',
          select: '-user',
          populate: {
            path: 'category',
          },
        })
        .populate({
          path: 'product',
          select: '-user',
          populate: {
            path: 'location',
          },
        })
        .populate({
          path: 'product',
          select: '-user',
          populate: {
            path: 'details',
          },
        })
        .populate({
          path: 'product',
          select: '-user',
          populate: {
            path: 'features',
          },
        });
      if (favorites.length >= 1) {
        return favorites;
      }
      throw new HttpException('favorites not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOneFavorite(id: string) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const favorite = await this.faviroteModel
        .findById(id)
        .populate('user')
        .populate('product');
      if (favorite == null) {
        throw new HttpException('favorite not found', HttpStatus.NOT_FOUND);
      }
      return favorite;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async removeFavorite(id: string) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const data = await this.faviroteModel.findByIdAndDelete(id);
      if (data == null) {
        throw new HttpException('favorite not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'favorite removed',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
