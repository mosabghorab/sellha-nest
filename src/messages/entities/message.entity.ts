import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { Chat } from '../../chats/entities/chat.entity';
import { MessageType } from '../enums/message-type.enum';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatId: number;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @Column()
  productId: number;

  @Column({ type: 'enum', enum: MessageType })
  type: MessageType;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations.
  // many to one.
  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn({ name: 'chatId' })
  chat: Chat;

  @ManyToOne(() => User, (user) => user.messagesAsSender)
  @JoinColumn({ name: 'senderId' })
  sender: User;

  @ManyToOne(() => User, (user) => user.messagesAsReceiver)
  @JoinColumn({ name: 'receiverId' })
  receiver: User;

  @ManyToOne(() => Product, (product) => product.chats)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
