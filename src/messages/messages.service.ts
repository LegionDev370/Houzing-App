import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './models/message.model';
import mongoose, { Model } from 'mongoose';
import { Request } from 'express';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}
  async createMessage(
    id: string,
    createMessageDto: CreateMessageDto,
    req: Request,
  ) {
    try {
      const user = req['user'];
      const product = id;
      const newProduct = await this.messageModel.create({
        ...createMessageDto,
        from_user: user,
        product,
      });
      return newProduct;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllMessages() {
    try {
      const messages = await this.messageModel
        .find()
        .populate({
          path: 'from_user',
          populate: {
            path: 'role',
          },
        })
        .populate({
          path: 'product',
          populate: {
            path: 'user',
          },
        })
        .populate({
          path: 'product',
          populate: {
            path: 'details',
          },
        })
        .populate({
          path: 'product',
          populate: {
            path: 'features',
          },
        });
      if (messages.length >= 1) {
        return messages;
      }
      throw new HttpException('No messages found', 404);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findOneMessage(id: string) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const message = this.messageModel
        .findById(id)
        .populate({
          path: 'from_user',
          populate: {
            path: 'role',
          },
        })
        .populate({
          path: 'product',
          populate: {
            path: 'user',
          },
        })
        .populate({
          path: 'product',
          populate: {
            path: 'details',
          },
        })
        .populate({
          path: 'product',
          populate: {
            path: 'features',
          },
        });
      if (message == null) {
        throw new HttpException('message not found', HttpStatus.NOT_FOUND);
      }
      return message;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateMessage(id: string, updateMessageDto: UpdateMessageDto) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const updatedMessage = await this.messageModel.findByIdAndUpdate(
        id,
        updateMessageDto,
        {
          new: true,
        },
      );
      if (updateMessageDto == null) {
        throw new HttpException('message not found', HttpStatus.NOT_FOUND);
      }
      return updatedMessage;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async removeMessage(id: string) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const deletedMessage = this.messageModel.findByIdAndDelete(id);
      if (deletedMessage == null) {
        throw new HttpException('message not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'successfully deleted',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async getMessagesUser(id: string) {
    try {
      if (!mongoose.isValidObjectId(id)) {
        throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
      }
      const messages = await this.messageModel
        .find()
        .populate('product')
        .populate('from_user');
      const filter = messages.filter((item) => item.product['user'] == id);
      return {
        messages: filter,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
