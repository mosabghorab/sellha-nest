import { IsEnum, IsNumber, IsObject, IsString, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ImagesExtensions } from '../enums/images-extensions.enum';
import { promisify } from 'util';
import { generateUniqueFileName } from '../helpers';

export class UploadImageDto {
  @IsString()
  name: string;

  @IsObject()
  data: any;

  @Max(10 * 1024 * 1024) // 10 mb
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  size: number;

  @IsEnum(ImagesExtensions)
  mimetype: ImagesExtensions;

  mv: any;

  static fromFile(file) {
    if (!file) return null;
    const dto = new UploadImageDto();
    dto.name = generateUniqueFileName(file.name);
    dto.data = file.data;
    dto.size = file.size;
    dto.mimetype = file.mimetype;
    dto.mv = promisify(file.mv);
    return dto;
  }
}
