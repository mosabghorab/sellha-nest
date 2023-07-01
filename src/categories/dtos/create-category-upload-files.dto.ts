import { ValidateNested } from 'class-validator';
import { UploadImageDto } from '../../config/dtos/upload-image-dto';

export class CreateCategoryUploadFilesDto {
  @ValidateNested({ message: 'image is required' })
  image: UploadImageDto;
}
