import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Strict } from '../config/metadata/strict.metadata';
import { Public } from '../config/metadata/public.metadata';
import { CategoryDto } from './dtos/category.dto';
import { Serialize } from '../config/interceptors/serialize.interceptor';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.CATEGORIES,
  })
  @Serialize(CategoryDto, 'Category created successfully.')
  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles() files: any,
  ) {
    return this.categoriesService.create(user.id, createCategoryDto, files);
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.CATEGORIES,
  })
  @Serialize(CategoryDto, 'Category updated successfully.')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFiles() files: any,
  ) {
    return this.categoriesService.update(id, updateCategoryDto, files);
  }

  @Public()
  @Serialize(CategoryDto, 'All Categories.')
  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Serialize(CategoryDto, 'One category.')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoriesService.findOneById(id, {
      parent: true,
      subCategories: true,
    });
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.CATEGORIES,
  })
  @Serialize(CategoryDto, 'Category deleted successfully.')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }
}
