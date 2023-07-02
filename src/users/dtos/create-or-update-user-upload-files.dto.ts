import { IsOptional, ValidateNested } from 'class-validator';
import { UploadImageDto } from '../../config/dtos/upload-image-dto';

export class CreateOrUpdateUserUploadFilesDto {
  @IsOptional()
  @ValidateNested()
  image: UploadImageDto;
}
