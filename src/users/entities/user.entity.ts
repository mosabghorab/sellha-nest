import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { compare, genSaltSync, hashSync } from 'bcryptjs';
import { UserRole } from 'src/config/enums/user-role.enum';
import { Product } from '../../products/entities/product.entity';
import { Favorite } from '../../favorite/entities/favorite.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ default: 1 })
  verification: number;

  @Column({ type: 'text', nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ default: true })
  isNotificationsEnabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // relations.
  // one to many.
  @OneToMany(() => Product, (product) => product.user, { cascade: true })
  products: Product[];

  @OneToMany(() => Favorite, (favorite) => favorite.user, { cascade: true })
  favorites: Favorite[];

  @OneToMany(() => Order, (order) => order.buyer, { cascade: true })
  ordersFromBuyers: Order[];

  @OneToMany(() => Order, (order) => order.seller, { cascade: true })
  ordersFromSellers: Order[];

  // hooks.
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      const salt = genSaltSync(10);
      this.password = hashSync(this.password, salt);
    }
  }

  // methods.
  async comparePassword(password: string) {
    return await compare(password, this.password);
  }
}
