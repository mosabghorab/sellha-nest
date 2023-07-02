import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiResponse } from '../config/classes/api-response';
import { FindMessagesDto } from './dtos/find-messages.dto';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
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
