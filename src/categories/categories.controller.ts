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
import { ApiResponse } from '../config/classes/api-response';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Strict } from '../config/metadata/strict.metadata';
import { Public } from '../config/metadata/public.metadata';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.CATEGORIES,
  })
  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles() files: any,
  ) {
    return new ApiResponse(
      true,
      'Category created successfully',
      200,
      await this.categoriesService.create(user.id, createCategoryDto, files),
    );
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.CATEGORIES,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFiles() files: any,
  ) {
    return new ApiResponse(
      true,
      'Category updated successfully',
      200,
      await this.categoriesService.update(id, updateCategoryDto, files),
    );
  }

  @Public()
  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All categories',
      200,
      await this.categoriesService.findAll(),
    );
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.CATEGORIES,
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Category deleted successfully',
      200,
      await this.categoriesService.delete(id),
    );
  }
}
