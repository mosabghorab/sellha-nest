import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsNotificationsService {
  send(reciever: string, content: string) {}
}
