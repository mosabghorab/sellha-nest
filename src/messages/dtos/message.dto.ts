import { MessageType } from '../enums/message-type.enum';
import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../users/dtos/user.dto';
import { ProductDto } from '../../products/dtos/product.dto';
import { ChatDto } from '../../chats/dtos/chat.dto';

export class MessageDto {
  @Expose()
  id: number;

  @Expose()
  chatId: number;

  @Expose()
  senderId: number;

  @Expose()
  receiverId: number;

  @Expose()
  productId: number;

  @Expose()
  type: MessageType;

  @Expose()
  content: string;

  @Expose()
  isRead: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => ChatDto)
  chat: ChatDto;

  @Expose()
  @Type(() => UserDto)
  sender: UserDto;

  @Expose()
  @Type(() => UserDto)
  receiver: UserDto;

  @Expose()
  @Type(() => ProductDto)
  product: ProductDto;
}
