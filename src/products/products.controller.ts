import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiResponse } from '../config/classes/api-response';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CurrentUser } from 'src/users/custom-decorators/current-user-decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FilterProductsDto } from './dtos/filter-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@CurrentUser() user: any, @Body() body: CreateProductDto) {
    return new ApiResponse(
      true,
      'Product created successfully',
      200,
      await this.productsService.create(user.id, body),
    );
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    return new ApiResponse(
      true,
      'Product updated successfully',
      200,
      await this.productsService.update(id, body),
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

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Query() dto: FilterProductsDto) {
    return new ApiResponse(
      true,
      'All products',
      200,
      await this.productsService.findAll(dto),
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
