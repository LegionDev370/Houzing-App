import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tour } from './models/tour.model';
import mongoose, { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private readonly tourModel: Model<Tour>,
  ) {}
  async createTour(createTourDto: CreateTourDto, id: string, req: Request) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const user = req['user'];
    const expiresDate = new Date(createTourDto.date);
    const currendDate = new Date();
    const getHour = currendDate.getHours();
    const getMinutes = currendDate.getMinutes();
    const getSeconds = currendDate.getSeconds();
    const localTime = getHour * 60 * 60 + getMinutes * 60 + getSeconds;
    const time = localTime + +createTourDto.time * 60 * 60;
    expiresDate.setSeconds(time);
    try {
      const data = await this.tourModel.create({
        ...createTourDto,
        time: `${createTourDto.time}:00`,
        product: id,
        from_user: user,
        date: expiresDate,
      });
      if (data) {
        return data;
      }
    } catch (error) {
      throw new HttpException(
        'INTERNAL SERVER ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllTours() {
    const data = await this.tourModel.find().populate('product');
    if (data.length >= 1) {
      return data;
    }
    throw new HttpException('tours not found', HttpStatus.NOT_FOUND);
  }

  async findOneTours(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const data = await this.tourModel.findById(id).populate('product');
    if (data == null) {
      throw new HttpException('tour not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async updateTour(id: string, updateTourDto: UpdateTourDto) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const data = await this.tourModel.findByIdAndUpdate(id, updateTourDto, {
      new: true,
    });
    if (data == null) {
      throw new HttpException('tour not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }

  async removeTour(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const data = await this.tourModel.findByIdAndDelete(id);
    if (data == null) {
      throw new HttpException('tour not found', HttpStatus.NOT_FOUND);
    }
    if (data) {
      return {
        message: 'success',
      };
    }
  }
  async getToursUser(id: string) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const tours = await this.tourModel
        .find()
        .populate('product')
        .populate('from_user');
      if (tours.length >= 0) {
        throw new HttpException('tours not found', HttpStatus.NOT_FOUND);
      }
      const filter = tours.filter((item) => item.product['user'] == id);
      return {
        tours: filter,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
