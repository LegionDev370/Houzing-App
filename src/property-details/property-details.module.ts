import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PropertyDetail,
  PropertyDetailSchema,
} from './models/property-detail.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PropertyDetail.name, schema: PropertyDetailSchema },
    ]),
  ],
})
export class PropertyDetailsModule {}
