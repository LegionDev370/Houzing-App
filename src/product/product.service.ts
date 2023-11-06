import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models/product.model';
import mongoose, { Model } from 'mongoose';
import { Category } from 'src/category/models/category.model';
import { PropertyDetail } from 'src/property-details/models/property-detail.model';
import { Location } from 'src/locations/models/location.model';
import { ProductMedia } from 'src/product-media/models/product-media.model';
import { FilesService } from 'src/file/file.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(PropertyDetail.name)
    private readonly propertyDetailsModel: Model<PropertyDetail>,
    @InjectModel(ProductMedia.name)
    private readonly productMediaModel: Model<ProductMedia>,
    private readonly fileService: FilesService,
  ) {}
  async createProduct(createProductDto: CreateProductDto) {
    const {
      name,
      description,
      country,
      region,
      city,
      address,
      price,
      user,
      category,
    }: any = createProductDto;
    const newProduct = {
      name,
      description,
      country,
      region,
      city,
      address,
      price,
      user,
      category,
    };
    const findCategory = await this.categoryModel.findById(category);
    if (findCategory == null) {
      throw new HttpException('category not found', HttpStatus.BAD_REQUEST);
    }
    try {
      const location = createProductDto['location'];
      const details = createProductDto['details'];
      const locationData = await this.locationModel.create(location);
      const detailsData = await this.propertyDetailsModel.create(details);
      const createdProduct = new this.productModel({
        ...newProduct,
        location: locationData.id,
        details: detailsData.id,
      });
      await createdProduct.save();
      if (createdProduct) {
        return createdProduct;
      }
    } catch (error) {
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async uplaodFile(id: string, file: any) {
    try {
      const files = await this.fileService.createFile(file);
      const data = await this.productMediaModel.create({
        file_path: files,
        description: 'null',
        data_uploaded: new Date(),
        product: id,
      });
      if (data) {
        return data;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getImagesProduct(id: string) {
    try {
      const ignore = { product: 0 };
      const data = await this.productMediaModel.find({ product: id }, ignore);
      if (data) {
        return data;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllProduct() {
    const products = await this.productModel
      .find()
      .populate('location')
      .populate('category')
      .populate('details')
      .populate('features');
    if (products.length >= 1) {
      return products;
    }
    throw new HttpException('products not found', HttpStatus.NOT_FOUND);
  }

  async findOneProduct(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const findProduct = await this.productModel
      .findById(id)
      .populate('location')
      .populate('category')
      .populate('details')
      .populate('features');
    if (findProduct == null) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
    return findProduct;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const findProduct = await this.productModel.findById(id);
    if (findProduct == null) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
    await this.locationModel.findByIdAndUpdate(
      findProduct.location,
      updateProductDto.location,
      {
        new: true,
      },
    );
    await this.propertyDetailsModel.findByIdAndUpdate(
      findProduct.details,
      updateProductDto.details,
      {
        new: true,
      },
    );
    const updateProduct = {
      ...updateProductDto,
      location: findProduct.location,
      details: findProduct.details,
    };
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProduct, {
        new: true,
      })
      .populate('location')
      .populate('category')
      .populate('details')
      .populate('features');
    if (updatedProduct == null) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
    return updatedProduct;
  }

  async removeProduct(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const findProduct = await this.productModel.findById(id);
    if (findProduct == null) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
    await this.locationModel.findByIdAndDelete(findProduct.location);
    await this.propertyDetailsModel.findByIdAndDelete(findProduct.details);
    const data = await this.productModel.findByIdAndDelete(id);
    if (data) {
      return {
        message: 'success',
      };
    }
  }
  async activateProduct(id: string) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const findProduct = await this.productModel.findById(id);
      if (findProduct.is_verified) {
        throw new HttpException(
          'product already verified',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (findProduct == null) {
        throw new HttpException('product not found', HttpStatus.NOT_FOUND);
      }
      const data = await this.productModel.findByIdAndUpdate(
        id,
        { is_verified: true },
        { new: true },
      );
      if (data) {
        return {
          message: 'success',
        };
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
