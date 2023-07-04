import {
  IsArray,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
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

  @IsArray()
  @Transform(({ value }) => JSON.parse(value))
  rolesIds: number[];
}
