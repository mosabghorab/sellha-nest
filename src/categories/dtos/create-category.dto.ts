import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  parentId: number;

  @IsUrl()
  image: string;

  @IsString()
  name: string;
}
