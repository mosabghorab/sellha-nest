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
import { ApiResponse } from '../config/classes/api-response';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { FindChatsDto } from './dtos/find-chats.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.CHATS,
  })
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
    return new ApiResponse(
      true,
      'create or getting chat successfully',
      200,
      chat,
    );
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.CHATS,
  })
  @Get()
  async findAll(@CurrentUser() user: any, @Query() findChatsDto: FindChatsDto) {
    return new ApiResponse(
      true,
      'getting all chats successfully',
      200,
      await this.chatsService.findAll(user.id, findChatsDto, {
        buyer: true,
        seller: true,
        product: true,
      }),
    );
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.CHATS,
  })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateChatDto: UpdateChatDto) {
    return new ApiResponse(
      true,
      'chat updated successfully',
      200,
      await this.chatsService.update(id, updateChatDto),
    );
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.CHATS,
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'chat deleted successfully',
      200,
      await this.chatsService.remove(id),
    );
  }
}
