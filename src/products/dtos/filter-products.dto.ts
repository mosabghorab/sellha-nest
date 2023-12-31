import { ProductType } from '../../config/enums/product-type.enum';
import {
  IsBoolean,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterProductsDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  userId: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  categoryId: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  priceFrom: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  priceTo: number;

  @IsOptional()
  @IsEnum(ProductType)
  type: string;

  @IsOptional()
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  lat: number;

  @IsOptional()
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  lng: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  discount: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page = 1;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  limit = 10;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isBestOffers: boolean;
}
