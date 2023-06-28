import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  parentId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  imageId: number;

  @IsString()
  name: string;
}
