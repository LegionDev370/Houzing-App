import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { MailModule } from './mail/mail.module';
import { PropertyTypesModule } from './property_types/property_types.module';
import { ProductModule } from './product/product.module';
import { PropertyDetailsModule } from './property-details/property-details.module';
import { ReviewsModule } from './reviews/reviews.module';
import { FeaturesModule } from './features/features.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ToursModule } from './tours/tours.module';
import { ProductMediaModule } from './product-media/product-media.module';
import { LocationsModule } from './locations/locations.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import { MessagesModule } from './messages/messages.module';
import { resolve } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    AuthModule,
    RolesModule,
    UsersModule,
    CategoryModule,
    MailModule,
    PropertyTypesModule,
    ProductModule,
    PropertyDetailsModule,
    ReviewsModule,
    FeaturesModule,
    FavoritesModule,
    ToursModule,
    ProductMediaModule,
    LocationsModule,
    FileModule,
    MessagesModule,
  ],
})
export class AppModule {}
