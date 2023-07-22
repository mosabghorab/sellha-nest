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
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CurrentUser } from 'src/users/custom-decorators/current-user-decorator';
import { FilterProductsDto } from './dtos/filter-products.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Public } from '../config/metadata/public.metadata';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { ProductDto } from './dtos/product.dto';
import { ProductsWithPaginationDto } from './dtos/products-with-pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.PRODUCTS,
  })
  @Serialize(ProductDto, 'Product created successfully.')
  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: any,
  ) {
    return this.productsService.create(user.id, createProductDto, files);
  }

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.PRODUCTS,
  })
  @Serialize(ProductDto, 'Products created successfully.')
  @Post('fake')
  async generateFake(@CurrentUser() user: any, @Query('count') count: number) {
    return this.productsService.generateFake(user.id, count);
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.PRODUCTS,
  })
  @Serialize(ProductDto, 'Product updated successfully.')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: any,
  ) {
    return this.productsService.update(id, updateProductDto, files);
  }

  @Public()
  @Serialize(ProductDto, 'One product.')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productsService.findOneById(id);
  }

  @Public()
  @Serialize(ProductsWithPaginationDto, 'All products.')
  @Get()
  async findAll(@Query() filterProductsDto: FilterProductsDto) {
    return this.productsService.findAll(filterProductsDto);
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.PRODUCTS,
  })
  @Serialize(ProductDto, 'Product deleted successfully.')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.productsService.delete(id);
  }
}
