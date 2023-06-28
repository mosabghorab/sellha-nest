import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Order } from './entities/order.entity';
import { ProductsService } from '../products/products.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  // create new order.
  async create(userId: number, createOrderDto: CreateOrderDto) {
    const buyer = await this.usersService.findOne(userId);
    const seller = await this.usersService.findOne(createOrderDto.sellerId);
    const product = await this.productsService.findOneById(
      createOrderDto.productId,
    );
    const order = await this.repo.create(createOrderDto);
    order.buyer = buyer;
    order.seller = seller;
    order.product = product;
    return this.repo.save(order);
  }

  // find all orders.
  findAll() {
    return this.repo.find({
      relations: {
        seller: true,
        buyer: true,
        product: {
          category: true,
          subCategory: true,
        },
      },
    });
  }

  // find one by id.
  async findOneById(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: { seller: true, buyer: true, product: true },
    });
  }

  // update.
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOneById(id);
    if (!order) {
      throw new NotFoundException('Order not found.');
    }
    Object.assign(order, updateOrderDto);
    return this.repo.save(order);
  }

  // remove by id.
  async remove(id: number) {
    const order = await this.findOneById(id);
    if (!order) {
      throw new NotFoundException('Order not found.');
    }
    return this.repo.remove(order);
  }
}
