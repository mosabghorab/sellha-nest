import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Reason } from '../../reasons/entities/reason.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column({ nullable: true })
  reasonId: number;

  @Column()
  text: string;

  // relations.
  @ManyToOne(() => Product, (product) => product.reports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Reason, (reason) => reason.reports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reasonId' })
  reason: Reason;
}
