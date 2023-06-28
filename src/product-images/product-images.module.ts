import { Module } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { ProductImagesController } from './product-images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImage]),
    ProductsModule,
    CategoriesModule,
  ],
  providers: [ProductImagesService],
  controllers: [ProductImagesController],
})
export class ProductImagesModule {}
