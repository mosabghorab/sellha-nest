import { ChatStatus } from '../enums/chat-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateChatDto {
  @IsEnum(ChatStatus)
  status: ChatStatus;
}
