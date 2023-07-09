import { Expose, Type } from 'class-transformer';
import { ProductDto } from '../../products/dtos/product.dto';
import { UserDto } from '../../users/dtos/user.dto';

export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  buyerId: number;

  @Expose()
  sellerId: number;

  @Expose()
  productId: number;

  @Expose()
  text: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

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
