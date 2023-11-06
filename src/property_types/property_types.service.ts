import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePropertyTypeDto } from './dto/create-property_type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyType } from './models/property_type.model';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class PropertyTypesService {
  constructor(
    @InjectModel(PropertyType.name)
    private readonly propertyTypeModel: Model<PropertyType>,
  ) {}
  async createPropertyType(createPropertyTypeDto: CreatePropertyTypeDto) {
    const findPropertyType = await this.propertyTypeModel.findOne({
      name: createPropertyTypeDto.name,
    });
    if (findPropertyType == null) {
      try {
        const newPropertyType = await this.propertyTypeModel.create(
          createPropertyTypeDto,
        );
        return {
          message: 'Successfully created',
          data: newPropertyType,
        };
      } catch (error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    throw new HttpException('already exists', HttpStatus.BAD_REQUEST);
  }

  async findAllPropertyType() {
    const data = await this.propertyTypeModel.find();
    if (data.length >= 1) {
      return data;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  async findOnePropertyType(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const data = await this.propertyTypeModel.findById(id);
    if (data == null) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    if (data) {
      return data;
    }
    throw new HttpException('not found', HttpStatus.NOT_FOUND);
  }

  async updatePropertyType(
    id: string,
    updatePropertyTypeDto: UpdatePropertyTypeDto,
  ) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    const updatedPropertyType = await this.propertyTypeModel.findByIdAndUpdate(
      id,
      updatePropertyTypeDto,
      {
        new: true,
      },
    );
    if (updatedPropertyType == null) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    if (updatedPropertyType) {
      return updatedPropertyType;
    }
  }

  async removePropertyType(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
    }
    const data = await this.propertyTypeModel.findByIdAndDelete(id);
    if (data == null) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    if (data) {
      return {
        message: 'Deleted',
      };
    }
  }
}
