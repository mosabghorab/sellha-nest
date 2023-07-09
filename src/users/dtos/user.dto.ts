import { Expose, Transform, Type } from 'class-transformer';
import { CategoryDto } from '../../categories/dtos/category.dto';
import { ProductDto } from '../../products/dtos/product.dto';
import { CommentDto } from '../../comments/dtos/comment.dto';
import { Constants } from '../../config/constants';
import { FavoriteDto } from '../../favorite/dtos/favorite.dto';
import { OrderDto } from '../../orders/dto/order.dto';
import { ChatDto } from '../../chats/dtos/chat.dto';
import { MessageDto } from '../../messages/dtos/message.dto';
import { UsersRolesDto } from '../../users-roles/dtos/users-roles.dto';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  verification: number;

  @Expose()
  @Transform(({ value }) =>
    !value ? null : Constants.baseUrl + Constants.usersImagesUrl + value,
  )
  image: string;

  @Expose()
  bio: string;

  @Expose()
  isNotificationsEnabled: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => CategoryDto)
  categories: CategoryDto[];

  @Expose()
  @Type(() => ProductDto)
  products: ProductDto[];

  @Expose()
  @Type(() => FavoriteDto)
  favorites: FavoriteDto[];

  @Expose()
  @Type(() => OrderDto)
  ordersFromBuyers: OrderDto[];

  @Expose()
  @Type(() => OrderDto)
  ordersFromSellers: OrderDto[];

  @Expose()
  @Type(() => ChatDto)
  chatsAsBuyer: ChatDto[];

  @Expose()
  @Type(() => ChatDto)
  chatsAsSeller: ChatDto[];

  @Expose()
  @Type(() => MessageDto)
  messagesAsSender: MessageDto[];

  @Expose()
  @Type(() => MessageDto)
  messagesAsReceiver: MessageDto[];

  @Expose()
  @Type(() => CommentDto)
  commentsAsSeller: CommentDto[];

  @Expose()
  @Type(() => CommentDto)
  commentsAsBuyer: CommentDto[];

  @Expose()
  @Type(() => UsersRolesDto)
  usersRoles: UsersRolesDto[];
}
