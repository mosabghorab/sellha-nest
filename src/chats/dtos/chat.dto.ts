import { Expose, Type } from 'class-transformer';
import { ChatStatus } from '../enums/chat-status.enum';
import { UserDto } from '../../users/dtos/user.dto';
import { ProductDto } from '../../products/dtos/product.dto';
import { MessageDto } from '../../messages/dtos/message.dto';

export class ChatDto {
  @Expose()
  id: number;

  @Expose()
  buyerId: number;

  @Expose()
  sellerId: number;

  @Expose()
  productId: number;

  @Expose()
  status: ChatStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => MessageDto)
  messages: MessageDto[];

  @Expose()
  @Type(() => UserDto)
  buyer: UserDto;

  @Expose()
  @Type(() => UserDto)
  seller: UserDto;

  @Expose()
  @Type(() => ProductDto)
  product: ProductDto;
}
