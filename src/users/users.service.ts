import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { log } from 'node:console';
import { CreateOrUpdateUserUploadFilesDto } from './dtos/create-or-update-user-upload-files.dto';
import { UploadImageDto } from 'src/config/dtos/upload-image-dto';
import { validateDto } from 'src/config/helpers';
import * as fs from 'fs-extra';
import { Constants } from 'src/config/constants';
import { unlinkSync } from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) { }

  // find by email.
  findByEmail(email: string, withPassword?: boolean) {
    return this.repo.findOne({
      where: {
        email,
      },
      select: withPassword ? this._getCols() : null,
    });
  }

  // find by phone.
  findByPhone(phone: string) {
    return this.repo.findOne({
      where: { phone },
    });
  }

  // create.
  async create(createUserDto: CreateUserDto, files?: any) {
    const userByPhone = await this.findByPhone(createUserDto.phone);
    if (userByPhone) {
      throw new BadRequestException('Phone is already exists.');
    }
    if (createUserDto.email) {
      const userByEmail = await this.findByEmail(createUserDto.email);
      if (userByEmail) {
        throw new BadRequestException('Email is already exists.');
      }
    }
    const createUserUploadFilesDto = await this.prepareCreateOrUpdateUserUploadFilesDtoFromFiles(files);
    if (createUserUploadFilesDto.image) {
      createUserDto.image = createUserUploadFilesDto.image.name;
    }
    const createdUser = await this.repo.save(await this.repo.create(createUserDto));
    delete createdUser.password;
    return createdUser;
  }

  findAll() {
    return this.repo.find();
  }

  async findOneById(id: number) {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto, files?: any) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (updateUserDto.phone) {
      const userByPhone = await this.findByPhone(updateUserDto.phone);
      if (userByPhone) {
        throw new BadRequestException('Phone is already exists.');
      }
    }
    if (updateUserDto.email) {
      const userByEmail = await this.findByEmail(updateUserDto.email);
      if (userByEmail) {
        throw new BadRequestException('Email is already exists.');
      }
    }
    if (files) {
      const createOrUpdateUserUploadFilesDto = await this.prepareCreateOrUpdateUserUploadFilesDtoFromFiles(files);
      if (createOrUpdateUserUploadFilesDto.image) {
        unlinkSync(Constants.usersImagesPath + user.image);
        updateUserDto.image = createOrUpdateUserUploadFilesDto.image.name;
      }
    }
    Object.assign(user, updateUserDto);
    const updatedUser = await this.repo.save(user);
    delete updatedUser.password;
    return updatedUser;
  }

  async delete(id: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return this.repo.remove(user);
  }

  private _getCols(): (keyof User)[] {
    return this.repo.metadata.columns.map(
      (col) => col.propertyName,
    ) as (keyof User)[];
  }

  // prepare create or update user upload files dtos from files.
  private async prepareCreateOrUpdateUserUploadFilesDtoFromFiles(
    files: any,
  ): Promise<CreateOrUpdateUserUploadFilesDto> {
    const createOrUpdateUserUploadFilesDto = new CreateOrUpdateUserUploadFilesDto();
    createOrUpdateUserUploadFilesDto.image = UploadImageDto.fromFile(files?.image);
    await validateDto(createOrUpdateUserUploadFilesDto);
    await fs.ensureDir(Constants.usersImagesPath);
    await createOrUpdateUserUploadFilesDto.image?.mv(
      Constants.usersImagesPath + createOrUpdateUserUploadFilesDto.image.name,
    );
    return createOrUpdateUserUploadFilesDto;
  }

}
