import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsString()
  image: string;
}
