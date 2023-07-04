import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { UsersService } from '../users/users.service';
import { UploadImageDto } from '../config/dtos/upload-image-dto';
import { saveFile, validateDto } from '../config/helpers';
import { Constants } from '../config/constants';
import { CreateCategoryUploadedFilesDto } from './dtos/create-category-upload-files.dto';
import { unlinkSync } from 'fs';
import { UpdateCategoryUploadedFilesDto } from './dtos/update-category-upload-files.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>,
    private readonly usersService: UsersService,
  ) {}

  // create.
  async create(userId: number, createCategoryDto: CreateCategoryDto, files) {
    const createCategoryUploadFilesDto =
      await this._prepareCreateCategoryUploadedFilesDtoFromFiles(files);
    const user = await this.usersService.findOneById(userId);
    const category = await this.repo.create({
      image: createCategoryUploadFilesDto.image.name,
      ...createCategoryDto,
    });
    category.user = user;
    return this.repo.save(category);
  }

  // update.
  async update(id: number, updateCategoryDto: UpdateCategoryDto, files: any) {
    const updateCategoryUploadFilesDto =
      await this._prepareUpdateAdUploadFilesDtoFromFiles(files);
    const category = await this.findOneById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    if (updateCategoryUploadFilesDto.image) {
      unlinkSync(Constants.categoriesImagesPath + category.image);
      category.image = updateCategoryUploadFilesDto.image.name;
    }
    Object.assign(category, updateCategoryDto);
    return this.repo.save(category);
  }

  // find one by id.
  async findOneById(id: number, relations?: FindOptionsRelations<Category>) {
    return this.repo.findOne({
      where: { id },
      relations: relations,
    });
  }

  // find all.
  async findAll(relations?: FindOptionsRelations<Category>) {
    return this.repo.find({
      where: { parentId: IsNull() },
      relations: relations,
    });
  }

  // delete.
  async delete(id: number) {
    const category = await this.findOneById(id);
    if (!category) {
      throw new NotFoundException('Category not found.');
    }
    unlinkSync(Constants.categoriesImagesPath + category.image);
    return this.repo.remove(category);
  }

  // prepare create category uploaded files dto from files.
  private async _prepareCreateCategoryUploadedFilesDtoFromFiles(
    files: any,
  ): Promise<CreateCategoryUploadedFilesDto> {
    const createCategoryUploadFilesDto = new CreateCategoryUploadedFilesDto();
    createCategoryUploadFilesDto.image = UploadImageDto.fromFile(files?.image);
    await validateDto(createCategoryUploadFilesDto);
    await saveFile(
      Constants.categoriesImagesPath,
      createCategoryUploadFilesDto.image?.name,
      createCategoryUploadFilesDto.image,
    );
    return createCategoryUploadFilesDto;
  }

  // prepare update category upload files dto from files.
  private async _prepareUpdateAdUploadFilesDtoFromFiles(
    files: any,
  ): Promise<UpdateCategoryUploadedFilesDto> {
    const updateCategoryUploadFilesDto = new UpdateCategoryUploadedFilesDto();
    updateCategoryUploadFilesDto.image = UploadImageDto.fromFile(files?.image);
    await validateDto(updateCategoryUploadFilesDto);
    if (updateCategoryUploadFilesDto.image)
      await saveFile(
        Constants.categoriesImagesPath,
        updateCategoryUploadFilesDto.image.name,
        updateCategoryUploadFilesDto.image,
      );
    return updateCategoryUploadFilesDto;
  }
}
