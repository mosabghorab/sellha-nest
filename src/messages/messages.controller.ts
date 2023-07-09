import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { FindMessagesDto } from './dtos/find-messages.dto';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { MessageDto } from './dtos/message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.MESSAGES,
  })
  @Serialize(MessageDto, 'Message created successfully.')
  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @UploadedFiles() files: any,
  ) {
    return this.messagesService.create(createMessageDto, files);
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.MESSAGES,
  })
  @Serialize(MessageDto, 'All messages.')
  @Get()
  async findAll(
    @CurrentUser() user: any,
    @Query() findMessagesDto: FindMessagesDto,
  ) {
    return this.messagesService.findAll(user.id, findMessagesDto);
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.MESSAGES,
  })
  @Serialize(MessageDto, 'Message deleted successfully.')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.messagesService.remove(id);
  }
}
