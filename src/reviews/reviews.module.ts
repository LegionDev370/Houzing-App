import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './models/review.model';
import { User, UserSchema } from 'src/users/models/user.model';
import { Product, ProductSchema } from 'src/product/models/product.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/roles/models/role.model';
import { RoleSchema } from 'src/roles/models/role.model';
@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Review.name, schema: ReviewSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, UsersService],
})
export class ReviewsModule {}
