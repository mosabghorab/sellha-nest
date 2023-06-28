import { IsEnum, IsNumber, IsObject, IsString, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { FilesExtensions } from '../enums/files-extensions.enum';

export class UploadFileDto {
  @IsString()
  name: string;

  @IsObject()
  data: string;

  @Max(5000)
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  size: number;

  @IsEnum(FilesExtensions)
  mimetype: FilesExtensions;

  mv: any;

  static fromFile(file) {
    if (!file) return null;
    const dto = new UploadFileDto();
    dto.name = file.name;
    dto.data = file.data;
    dto.size = file.size;
    dto.mimetype = file.mimetype;
    dto.mv = file.mv;
    return dto;
  }
}
