import { ProductType } from '../../config/enums/product-type.enum';
import {
  IsBoolean,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @IsUrl()
  mainImage: string;

  @IsEnum(ProductType)
  type: string;

  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  lat: number;

  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  lng: number;

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  discount: number;

  @IsBoolean()
  isBestOffers: boolean;
}
