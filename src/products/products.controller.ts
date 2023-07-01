import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiResponse } from '../config/classes/api-response';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CurrentUser } from 'src/users/custom-decorators/current-user-decorator';
import { FilterProductsDto } from './dtos/filter-products.dto';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: any,
  ) {
    return new ApiResponse(
      true,
      'Product created successfully',
      200,
      await this.productsService.create(user.id, createProductDto, files),
    );
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: any,
  ) {
    return new ApiResponse(
      true,
      'Product updated successfully',
      200,
      await this.productsService.update(id, updateProductDto, files),
    );
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Show product',
      200,
      await this.productsService.findOneById(id),
    );
  }

  @Get()
  async getAll(@Query() filterProductsDto: FilterProductsDto) {
    return new ApiResponse(
      true,
      'All products',
      200,
      await this.productsService.findAll(filterProductsDto),
    );
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Product deleted successfully',
      200,
      await this.productsService.delete(id),
    );
  }
}
