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
import { ProductType } from '../../config/enums/product-type.enum';
import { User } from '../../users/entities/user.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ type: 'text' })
  mainImage: string;

  @Column({ type: 'enum', enum: ProductType })
  type: string;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  discount: number;

  @Column()
  isBestOffers: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations.
  @ManyToOne(() => User, (user) => user.products,{
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.product, { cascade: true })
  favorites: Favorite[];
}
