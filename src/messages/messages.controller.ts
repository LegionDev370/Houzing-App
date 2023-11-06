import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Request } from 'express';
import { Roles } from 'src/decorators/role-decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Message')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create message',
  })
  @Post('/:id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  createMessage(
    @Param('id') id: string,
    @Body() createMessageDto: CreateMessageDto,
    @Req() req: Request,
  ) {
    return this.messagesService.createMessage(id, createMessageDto, req);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'find all messages',
  })
  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  findAllMessages() {
    return this.messagesService.findAllMessages();
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get one message',
  })
  @Get(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  findOneMessage(@Param('id') id: string) {
    return this.messagesService.findOneMessage(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update message',
  })
  @Put(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.updateMessage(id, updateMessageDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'remove message',
  })
  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  removeMessage(@Param('id') id: string) {
    return this.messagesService.removeMessage(id);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get message user',
  })
  @Get('/user/:id')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('SUPERADMIN', 'ADMIN', 'USER')
  getMessagesUser(@Param('id') id: string) {
    return this.messagesService.getMessagesUser(id);
  }
}
