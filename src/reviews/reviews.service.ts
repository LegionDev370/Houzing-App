import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './models/review.model';
import mongoose, { Model } from 'mongoose';
import { Product } from 'src/product/models/product.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { find } from 'rxjs';
@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async createReview(createReviewDto: CreateReviewDto, id: string) {
    try {
      const currentDate = new Date();
      const newReview = await this.reviewModel.create({
        ...createReviewDto,
        date: currentDate,
        product: id,
        user: '6541ca3a9e1d165037616cf3',
      });
      if (newReview) {
        return newReview;
      }
      
    } catch (error) {
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllReviews() {
    const reviews = await this.reviewModel.find();
    if (find.length >= 1) {
      return reviews;
    }
    throw new HttpException('product not found', HttpStatus.NOT_FOUND);
  }

  async findOneReview(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.NOT_FOUND);
    }
    const review = await this.reviewModel.findById(id);
    if (review == null) {
      throw new HttpException('review not found', HttpStatus.NOT_FOUND);
    }
    return review;
  }

  async removeReview(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const data = await this.reviewModel.findByIdAndDelete(id);
    if (data == null) {
      throw new HttpException('review not found', HttpStatus.NOT_FOUND);
    }
    if (data) {
      return {
        message: 'success',
      };
    }
  }
}
