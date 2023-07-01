import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesService } from './categories.service';
import { ApiResponse } from '../config/classes/api-response';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
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

  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All categories',
      200,
      await this.categoriesService.findAll(),
    );
  }

  @UseGuards(AdminGuard)
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
