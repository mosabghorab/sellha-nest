import { MessageType } from '../enums/message-type.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMessageDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  chatId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  senderId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  receiverId: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  productId: number;

  @IsEnum(MessageType)
  type: MessageType;

  @IsOptional()
  @IsString()
  content: string;
}
