import { ProductType } from '../../config/enums/product-type.enum';
import { Expose, Transform, Type } from 'class-transformer';
import { Constants } from '../../config/constants';
import { CategoryDto } from '../../categories/dtos/category.dto';
import { ProductImageDto } from '../../product-images/dtos/product-image.dto';
import { UserDto } from '../../users/dtos/user.dto';
import { FavoriteDto } from '../../favorite/dtos/favorite.dto';
import { ReportDto } from '../../reports/dto/report.dto';
import { OrderDto } from '../../orders/dto/order.dto';
import { ChatDto } from '../../chats/dtos/chat.dto';
import { CommentDto } from '../../comments/dtos/comment.dto';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  userId: number;

  @Expose()
  categoryId: number;

  @Expose()
  subCategoryId: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  viewCount: number;

  @Expose()
  @Transform(
    ({ value }) => Constants.baseUrl + Constants.productsImagesUrl + value,
  )
  mainImage: string;

  @Expose()
  type: ProductType;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  discount: number;

  @Expose()
  isBestOffers: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @Expose()
  @Type(() => CategoryDto)
  subCategory: CategoryDto;

  @Expose()
  @Type(() => FavoriteDto)
  favorites: FavoriteDto[];

  @Expose()
  @Type(() => ReportDto)
  reports: ReportDto[];

  @Expose()
  @Type(() => OrderDto)
  orders: OrderDto[];

  @Expose()
  @Type(() => ProductImageDto)
  images: ProductImageDto[];

  @Expose()
  @Type(() => ChatDto)
  chats: ChatDto[];

  @Expose()
  @Type(() => CommentDto)
  comments: CommentDto[];
}
