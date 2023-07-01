import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatStatus } from '../enums/chat-status.enum';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buyerId: number;

  @Column()
  sellerId: number;

  @Column()
  productId: number;

  @Column({ type: 'enum', enum: ChatStatus, default: ChatStatus.ACTIVE })
  status: ChatStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations.
  // one to many.
  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Message[];

  // many to one.
  @ManyToOne(() => User, (user) => user.chatsAsBuyer)
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @ManyToOne(() => User, (user) => user.chatsAsSeller)
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @ManyToOne(() => Product, (product) => product.chats)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
