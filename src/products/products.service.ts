import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UsersService } from '../users/users.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { FilterProductsDto } from './dtos/filter-products.dto';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductUploadFilesDto } from './dtos/create-product-upload-files.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  // create new product.
  async create(
    userId: number,
    createProductDto: CreateProductDto,
    createProductUploadFilesDto: CreateProductUploadFilesDto,
  ) {
    const user = await this.usersService.findOne(userId);
    const category = await this.categoriesService.findOneById(
      createProductDto.categoryId,
    );
    const subCategory = await this.categoriesService.findOneById(
      createProductDto.subCategoryId,
    );
    const product = await this.repo.create({
      mainImage: createProductUploadFilesDto.mainImage.name,
      ...createProductDto,
    });
    product.user = user;
    product.category = category;
    product.subCategory = subCategory;
    return this.repo.save(product);
  }

  // find products with filter.
  async findAll(filterProductsDto: FilterProductsDto) {
    const query = this.repo.createQueryBuilder('product');
    query.leftJoinAndSelect('product.user', 'user');
    query.leftJoinAndSelect('product.subCategory', 'subCategory');
    query.leftJoinAndSelect('subCategory.parent', 'parent');
    const offset = (filterProductsDto.page - 1) * filterProductsDto.limit;
    query.skip(offset).take(filterProductsDto.limit);

    if (filterProductsDto.userId) {
      query.andWhere('product.userId = :userId', {
        userId: filterProductsDto.userId,
      });
    }
    if (filterProductsDto.name) {
      query.andWhere(`JSON_EXTRACT(product.name, '$.${'ar'}') LIKE :name`, {
        name: `%${filterProductsDto.name}%`,
      });
    }
    if (filterProductsDto.priceFrom) {
      query.andWhere('product.price >= :priceFrom', {
        priceFrom: filterProductsDto.priceFrom,
      });
    }
    if (filterProductsDto.priceTo) {
      query.andWhere('product.price <= :priceTo', {
        priceTo: filterProductsDto.priceTo,
      });
    }
    if (filterProductsDto.type) {
      query.andWhere('product.type = :type', { type: filterProductsDto.type });
    }
    if (filterProductsDto.lat && filterProductsDto.lng) {
      query.andWhere('product.lat = :lat AND product.lng = :lng', {
        lat: filterProductsDto.lat,
        lng: filterProductsDto.lng,
      });
    }
    if (filterProductsDto.discount) {
      query.andWhere('product.discount >= :discount', {
        discount: filterProductsDto.discount,
      });
    }
    if (filterProductsDto.isBestOffers != null) {
      query.andWhere('product.isBestOffers = :isBestOffers', {
        isBestOffers: filterProductsDto.isBestOffers,
      });
    }
    const [data, count] = await query.getManyAndCount();
    return {
      perPage: filterProductsDto.limit,
      currentPage: filterProductsDto.page,
      lastPage: Math.ceil(count / filterProductsDto.limit),
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOneById(id);
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    Object.assign(product, updateProductDto);
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
    // const fakeData = Array.from({ length: count }).map(() => ({
    //   name: faker.lorem.word(),
    //   userId: 3,
    //   description: faker.lorem.sentence(),
    //   price: faker.number.float({ min: 10, max: 10000 }),
    //   viewCount: faker.number.int({ min: 0, max: 10000 }),
    //   mainImage: faker.image.avatar(),
    //   type: faker.helpers.arrayElement(Object.values(ProductType)),
    //   lat: faker.location.latitude(),
    //   lng: faker.location.longitude(),
    //   discount: faker.number.float({ min: 0, max: 50 }),
    //   isBestOffers: faker.datatype.boolean(),
    // }));
    // await this.repo.save(fakeData);
  }
}
