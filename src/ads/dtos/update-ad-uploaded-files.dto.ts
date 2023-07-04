import { IsOptional, ValidateNested } from 'class-validator';
import { UploadImageDto } from '../../config/dtos/upload-image-dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAdUploadedFilesDto } from './create-ad-uploaded-files.dto';

export class UpdateAdUploadedFilesDto extends PartialType(CreateAdUploadedFilesDto) {
}
