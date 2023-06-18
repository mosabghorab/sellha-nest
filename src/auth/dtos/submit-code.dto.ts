import { IsPhoneNumber, IsString } from 'class-validator';

export class SubmitCodeDto {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  code: string;
}
