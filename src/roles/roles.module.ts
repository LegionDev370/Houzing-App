import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './models/role.model';
import { User, UserSchema } from 'src/users/models/user.model';
import { UserRoleSchema, UserRoles } from './models/user-roles.model';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Message, MessageSchema } from 'src/messages/models/message.model';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserRoles.name,
        schema: UserRoleSchema,
      },
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService, UsersService],
})
export class RolesModule {}
