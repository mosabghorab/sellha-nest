import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrderDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  sellerId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  productId: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  productPrice: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  productDiscount: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  total: number;
}
