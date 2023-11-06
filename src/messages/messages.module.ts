import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './models/message.model';
import { Message } from './models/message.model';
import { User, UserSchema } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { Role, RoleSchema } from 'src/roles/models/role.model';
@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService, UsersService],
  exports: [MessagesService],
})
export class MessagesModule {}
