import { IsOptional, ValidateNested } from 'class-validator';
import { UploadImageDto } from '../../config/dtos/upload-image-dto';

export class CreateProductUploadFilesDto {
  @ValidateNested({ message: 'main image is required' })
  mainImage: UploadImageDto;

  @IsOptional()
  @ValidateNested({ each: true })
  images: UploadImageDto[];
}
