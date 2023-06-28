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
import { Product } from '../../products/entities/product.entity';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentId: number;

  @Column()
  name: string;

  @Column()
  imageId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations.
  // many to one.
  @ManyToOne(() => Category, (category) => category.subCategories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent: Category;

  // one to many.
  @OneToMany(() => Category, (category) => category.parent, { cascade: true })
  subCategories: Category[];

  @OneToMany(() => Product, (product) => product.subCategory, { cascade: true })
  productsFromSubCategory: Product[];

  @OneToMany(() => Product, (product) => product.category, { cascade: true })
  productsFromCategory: Product[];
}
