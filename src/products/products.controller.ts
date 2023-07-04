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
} from '@nestjs/common';
import { ApiResponse } from '../config/classes/api-response';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CurrentUser } from 'src/users/custom-decorators/current-user-decorator';
import { FilterProductsDto } from './dtos/filter-products.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Public } from '../config/metadata/public.metadata';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.PRODUCTS,
  })
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

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.PRODUCTS,
  })
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

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Show product',
      200,
      await this.productsService.findOneById(id),
    );
  }

  @Public()
  @Get()
  async getAll(@Query() filterProductsDto: FilterProductsDto) {
    return new ApiResponse(
      true,
      'All products',
      200,
      await this.productsService.findAll(filterProductsDto),
    );
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.PRODUCTS,
  })
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
