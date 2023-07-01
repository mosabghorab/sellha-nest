import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateChatDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  buyerId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  sellerId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  productId: number;
}
