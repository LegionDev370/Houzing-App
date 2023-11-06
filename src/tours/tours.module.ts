import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from './models/tour.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/models/user.model';
import { Role, RoleSchema } from 'src/roles/models/role.model';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Tour.name, schema: TourSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [ToursController],
  providers: [ToursService, UsersService],
})
export class ToursModule {}
