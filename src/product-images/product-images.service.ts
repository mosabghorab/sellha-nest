import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductImageDto } from './dtos/create-product-image.dto';
import { ProductImage } from './entities/product-image.entity';
import { CategoriesService } from '../categories/categories.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ProductImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly repo: Repository<ProductImage>,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createImageDto: CreateProductImageDto) {
    const productImage = await this.repo.create(createImageDto);
    const product = await this.productsService.findOneById(
      createImageDto.productId,
    );
    if (!product) {
      throw new NotFoundException('Product not found.');
    }
    productImage.product = product;
    return this.repo.save(productImage);
  }

  async findOneById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: { product: true },
    });
  }

  async findAll() {
    return this.repo.find({ relations: { product: true } });
  }

  async delete(id: number) {
    const productImage = await this.findOneById(id);
    if (!productImage) {
      throw new NotFoundException('Product image not found.');
    }
    return this.repo.remove(productImage);
  }
}
