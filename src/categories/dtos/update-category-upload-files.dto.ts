import { IsOptional, ValidateNested } from 'class-validator';
import { UploadImageDto } from '../../config/dtos/upload-image-dto';

export class UpdateCategoryUploadFilesDto {
  @IsOptional()
  @ValidateNested()
  image: UploadImageDto;
}
