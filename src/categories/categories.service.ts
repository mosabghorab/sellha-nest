import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>,
  ) {}

  async create(body: CreateCategoryDto) {
    const category = await this.repo.create(body);
    return this.repo.save(category);
  }

  async update(id: number, body: UpdateCategoryDto) {
    const category = await this.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    Object.assign(category, body);
    return this.repo.save(category);
  }

  async findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: { subCategories: true },
    });
  }

  async findAll() {
    return this.repo.find({
      where: { parentId: IsNull() },
      relations: { subCategories: true },
    });
  }

  async delete(id: number) {
    const category = await this.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found.');
    }
    return this.repo.remove(category);
  }
}
