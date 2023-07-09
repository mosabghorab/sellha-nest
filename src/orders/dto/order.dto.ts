import { Expose, Type } from 'class-transformer';
import { OrderStatus } from '../../config/enums/order-status.enum';
import { UserDto } from '../../users/dtos/user.dto';
import { ProductDto } from '../../products/dtos/product.dto';

export class OrderDto {
  @Expose()
  id: number;

  @Expose()
  buyerId: number;

  @Expose()
  sellerId: number;

  @Expose()
  productId: number;

  @Expose()
  productPrice: number;

  @Expose()
  productDiscount: number;

  @Expose()
  total: number;

  @Expose()
  status: OrderStatus;

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
