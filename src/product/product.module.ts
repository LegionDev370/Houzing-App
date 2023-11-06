import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './models/product.model';
import { Category, CategorySchema } from 'src/category/models/category.model';
import {
  PropertyDetail,
  PropertyDetailSchema,
} from 'src/property-details/models/property-detail.model';
import { LocationSchema } from 'src/locations/models/location.model';
import { User, UserSchema } from 'src/users/models/user.model';
import { Location } from 'src/locations/models/location.model';
import {
  PropertyType,
  PropertyTypeSchema,
} from 'src/property_types/models/property_type.model';
import {
  ProductMedia,
  ProductMediaSchema,
} from 'src/product-media/models/product-media.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { FilesService } from 'src/file/file.service';
import { Role, RoleSchema } from 'src/roles/models/role.model';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      {
        name: PropertyDetail.name,
        schema: PropertyDetailSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Location.name,
        schema: LocationSchema,
      },
      {
        name: PropertyType.name,
        schema: PropertyTypeSchema,
      },
      {
        name: ProductMedia.name,
        schema: ProductMediaSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, UsersService, FilesService],
})
export class ProductModule {}
