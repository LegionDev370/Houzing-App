import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './models/favorite.model';
import { Product, ProductSchema } from 'src/product/models/product.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/models/user.model';
import { Role, RoleSchema } from 'src/roles/models/role.model';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, UsersService],
})
export class FavoritesModule {}
