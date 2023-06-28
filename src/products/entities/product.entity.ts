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
import { Category } from '../../categories/entities/category.entity';
import { Report } from '../../reports/entities/report.entity';
import { Order } from '../../orders/entities/order.entity';
import { ProductImage } from '../../product-images/entities/product-image.entity';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  categoryId: number;

  @Column()
  subCategoryId: number;

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
  // many to one.
  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.product, { cascade: true })
  favorites: Favorite[];

  @ManyToOne(
    () => Category,
    (subCategory) => subCategory.productsFromSubCategory,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: Category;

  @ManyToOne(() => Category, (category) => category.productsFromCategory)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  // on to many.
  @OneToMany(() => Report, (report) => report.product, { cascade: true })
  reports: Report[];

  @OneToMany(() => Order, (order) => order.product, { cascade: true })
  orders: Order[];

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];
}
