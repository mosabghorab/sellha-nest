import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UsersService } from '../users/users.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { faker } from '@faker-js/faker';
import { ProductType } from 'src/config/enums/product-type.enum';
import { FilterProductsDto } from './dtos/filter-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
    private readonly usersService: UsersService,
  ) {}

  // create new product.
  async create(userId: number, body: CreateProductDto) {
    const user = await this.usersService.findOne(userId);
    const product = await this.repo.create(body);
    product.user = user;
    return this.repo.save(product);
  }

  // final products with filter.
  async findAll(dto: FilterProductsDto) {
    const query = this.repo.createQueryBuilder('product');
    query.leftJoinAndSelect('product.user', 'user');
    const offset = (dto.page - 1) * dto.limit;
    query.skip(offset).take(dto.limit);
    if (dto.userId) {
      query.andWhere('product.userId = :userId', { userId: dto.userId });
    }
    if (dto.name) {
      query.andWhere('product.name LIKE :name', { name: `%${dto.name}%` });
    }
    if (dto.priceFrom) {
      query.andWhere('product.price >= :priceFrom', {
        priceFrom: dto.priceFrom,
      });
    }
    if (dto.priceTo) {
      query.andWhere('product.price <= :priceTo', { priceTo: dto.priceTo });
    }
    if (dto.type) {
      query.andWhere('product.type = :type', { type: dto.type });
    }
    if (dto.lat && dto.lng) {
      query.andWhere('product.lat = :lat AND product.lng = :lng', {
        lat: dto.lat,
        lng: dto.lng,
      });
    }
    if (dto.discount) {
      query.andWhere('product.discount >= :discount', {
        discount: dto.discount,
      });
    }
    // if (dto.isBestOffers != null) {
    // query.andWhere('product.isBestOffers = :isBestOffers', { isBestOffers: dto.isBestOffers });
    // }
    const [data, count] = await query.getManyAndCount();
    return {
      perPage: dto.limit,
      currentPage: dto.page,
      lastPage: Math.ceil(count / dto.limit),
      total: count,
      data: data,
    };
  }

  // find one by id.
  async findOneById(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async update(id: number, body: UpdateProductDto) {
    const product = await this.findOneById(id);
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    Object.assign(product, body);
    return this.repo.save(product);
  }

  async delete(id: number) {
    const product = await this.findOneById(id);
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    return this.repo.remove(product);
  }

  // faker for products.
  async generateAndSaveFakeProducts(count: number): Promise<void> {
    const fakeData = Array.from({ length: count }).map(() => ({
      name: faker.lorem.word(),
      userId: 3,
      description: faker.lorem.sentence(),
      price: faker.number.float({ min: 10, max: 10000 }),
      viewCount: faker.number.int({ min: 0, max: 10000 }),
      mainImage: faker.image.avatar(),
      type: faker.helpers.arrayElement(Object.values(ProductType)),
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
      discount: faker.number.float({ min: 0, max: 50 }),
      isBestOffers: faker.datatype.boolean(),
    }));
    await this.repo.save(fakeData);
  }
}
