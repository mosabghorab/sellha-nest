import { ChatStatus } from '../enums/chat-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class FindChatsDto {
  @IsOptional()
  @IsEnum(ChatStatus)
  status: ChatStatus;
}
