import { Module } from '@nestjs/common';
import { PropertyTypesService } from './property_types.service';
import { PropertyTypesController } from './property_types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyType, PropertyTypeSchema } from './models/property_type.model';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { Role, RoleSchema } from 'src/roles/models/role.model';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: PropertyType.name, schema: PropertyTypeSchema },
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [PropertyTypesController],
  providers: [PropertyTypesService, UsersService],
})
export class PropertyTypesModule {}
