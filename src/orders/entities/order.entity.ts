import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { OrderStatus } from '../../config/enums/order-status.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buyerId: number;

  @Column()
  sellerId: number;

  @Column()
  productId: number;

  @Column()
  productPrice: number;

  @Column()
  productDiscount: number;

  @Column()
  total: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  // relations.
  // many to one.
  @ManyToOne(() => User, (user) => user.ordersFromBuyers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @ManyToOne(() => User, (user) => user.ordersFromSellers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @ManyToOne(() => Product, (product) => product.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
