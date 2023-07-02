import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindMessagesDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  chatId: number;
}
