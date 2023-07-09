import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dtos/create-chat.dto';
import { UpdateChatDto } from './dtos/update-chat.dto';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { FindChatsDto } from './dtos/find-chats.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { ChatDto } from './dtos/chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.CHATS,
  })
  @Serialize(ChatDto, 'Create or getting chat successfully.')
  @Post()
  async createOrGet(@Body() createChatDto: CreateChatDto) {
    let chat = await this.chatsService.findOneBySellerIdAndBuyerId(
      createChatDto.buyerId,
      createChatDto.sellerId,
      { buyer: true, seller: true, product: true },
    );
    if (!chat) {
      chat = await this.chatsService.create(createChatDto);
    }
    return chat;
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.CHATS,
  })
  @Serialize(ChatDto, 'All chats.')
  @Get()
  async findAll(@CurrentUser() user: any, @Query() findChatsDto: FindChatsDto) {
    return this.chatsService.findAll(user.id, findChatsDto, {
      buyer: true,
      seller: true,
      product: true,
    });
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.CHATS,
  })
  @Serialize(ChatDto, 'Chat updated successfully.')
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.CHATS,
  })
  @Delete(':id')
  @Serialize(ChatDto, 'Chat deleted successfully.')
  async remove(@Param('id') id: number) {
    return this.chatsService.remove(id);
  }
}
