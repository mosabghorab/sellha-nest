import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    buyerId: number;

    @Column()
    sellerId: number;

    @Column()
    productId: number;

    @Column({ type: 'text' })
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // relations.
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
