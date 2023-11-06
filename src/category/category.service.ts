import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './models/category.model';
import mongoose, { Model } from 'mongoose';
import { Product } from 'src/product/models/product.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const findCategory = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });
    if (!findCategory) {
      const newCategory = new this.categoryModel(createCategoryDto);
      return newCategory.save();
    }
    throw new BadRequestException('category already exists');
  }

  async findAllCategory() {
    const categories = await this.categoryModel.find();
    if (categories.length >= 1) {
      return categories;
    }
    throw new BadRequestException('categories not found');
  }

  async getProductsByCategory(query: string) {
    if (query) {
      const findCategory = await this.categoryModel.findOne({
        name: query,
      });
      const filter = { category: findCategory.id };
      const projection = { category: 0 };
      const products = await this.productModel
        .find(filter, projection)
        .populate('user')
        .populate({
          path: "details",
          populate: {
            path: "property_type"
          }
        })
        .populate('features');
      return products;
    }
    throw new HttpException('query not found', HttpStatus.BAD_REQUEST);
  }

  async findOneCategory(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const category = await this.categoryModel.findById(id);
    if (category == null) {
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      {
        new: true,
      },
    );
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new BadRequestException('category not found');
  }

  async removeCategory(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('invalid id');
    }
    const data = await this.categoryModel.findByIdAndRemove(id);
    if (data) {
      return {
        message: 'success',
      };
    }
    throw new BadRequestException('category not found');
  }
  async findProductByCategory(id: string) {}
}
