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
import { ApiResponse } from '../config/classes/api-response';
import { FindMessagesDto } from './dtos/find-messages.dto';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.MESSAGES,
  })
  @Post()
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @UploadedFiles() files: any,
  ) {
    return new ApiResponse(
      true,
      'message created successfully',
      200,
      await this.messagesService.create(createMessageDto, files),
    );
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.MESSAGES,
  })
  @Get()
  async findAll(
    @CurrentUser() user: any,
    @Query() findMessagesDto: FindMessagesDto,
  ) {
    return new ApiResponse(
      true,
      'get all messages successfully',
      200,
      await this.messagesService.findAll(user.id, findMessagesDto),
    );
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.MESSAGES,
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'message deleted successfully',
      200,
      await this.messagesService.remove(id),
    );
  }
}
