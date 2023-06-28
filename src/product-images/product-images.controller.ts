import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '../config/classes/api-response';
import { ProductImagesService } from './product-images.service';
import { CreateProductImageDto } from './dtos/create-product-image.dto';

@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly imagesService: ProductImagesService) {}

  @Post()
  async create(@Body() createImageDto: CreateProductImageDto) {
    return new ApiResponse(
      true,
      'Product image created successfully',
      200,
      await this.imagesService.create(createImageDto),
    );
  }

  @Get()
  async getAll() {
    return new ApiResponse(
      true,
      'All product images',
      200,
      await this.imagesService.findAll(),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Product image deleted successfully',
      200,
      await this.imagesService.delete(id),
    );
  }
}
