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
import { CreateOrUpdateUserUploadFilesDto } from './dtos/create-or-update-user-upload-files.dto';
import { UploadImageDto } from 'src/config/dtos/upload-image-dto';
import { saveFile, validateDto } from 'src/config/helpers';
import { Constants } from 'src/config/constants';
import { unlinkSync } from 'fs';
import { UsersRolesService } from '../users-roles/users-roles.service';
import { FindOptionsRelations } from 'typeorm/browser';
import { SignUpDto } from '../auth/dtos/sign-up.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly usersRolesService: UsersRolesService,
    private readonly notificationsService: NotificationsService,
  ) {}

  // find by email.
  findByEmail(
    email: string,
    withPassword?: boolean,
    relations?: FindOptionsRelations<User>,
  ) {
    return this.repo.findOne({
      where: {
        email,
      },
      select: withPassword ? this._getCols() : null,
      relations: relations,
    });
  }

  // find by phone.
  findByPhone(phone: string, relations?: FindOptionsRelations<User>) {
    return this.repo.findOne({
      where: { phone },
      relations: relations,
    });
  }

  // create.
  async create(dto: CreateUserDto | SignUpDto, files?: any) {
    const userByPhone = await this.findByPhone(dto.phone);
    if (userByPhone) {
      throw new BadRequestException('Phone is already exists.');
    }
    if (dto.email) {
      const userByEmail = await this.findByEmail(dto.email);
      if (userByEmail) {
        throw new BadRequestException('Email is already exists.');
      }
    }
    const createUserUploadFilesDto =
      await this._prepareCreateOrUpdateUserUploadFilesDtoFromFiles(files);
    if (createUserUploadFilesDto.image) {
      dto.image = createUserUploadFilesDto.image.name;
    }
    const userToCreate = await this.repo.create(dto);
    const usersRoles = await this.usersRolesService.create(
      userToCreate.id,
      dto instanceof CreateUserDto ? dto.rolesIds : [8],
    );
    userToCreate.usersRoles = usersRoles;
    const createdUser = await this.repo.save(userToCreate);
    delete createdUser.password;
    return createdUser;
  }

  findAll(relations?: FindOptionsRelations<User>) {
    console.log('findAll method,');
    return this.repo.find({ relations });
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
    const createOrUpdateUserUploadFilesDto =
      await this._prepareCreateOrUpdateUserUploadFilesDtoFromFiles(files);
    if (createOrUpdateUserUploadFilesDto.image) {
      unlinkSync(Constants.usersImagesPath + user.image);
      updateUserDto.image = createOrUpdateUserUploadFilesDto.image.name;
    }
    if (updateUserDto.rolesIds) {
      await this.usersRolesService.removeByUserId(id);
      user.usersRoles = await this.usersRolesService.create(
        id,
        updateUserDto.rolesIds,
      );
    }
    delete updateUserDto.rolesIds;
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

  @OnEvent('user.created')
  handleUserCreatedEvent(userCreatedEvent: UserCreatedEvent) {
    this.sendWelcomingEmail(userCreatedEvent.name, userCreatedEvent.email);
  }

  sendWelcomingEmail(name: string, email: string) {
    this.notificationsService.sendEmail(
      email,
      'Welcome to sellha app',
      'we are welcoming you to our beautiful system ' + name,
    );
  }

  private _getCols(): (keyof User)[] {
    return this.repo.metadata.columns.map(
      (col) => col.propertyName,
    ) as (keyof User)[];
  }

  // prepare create or update user upload files dto from files.
  private async _prepareCreateOrUpdateUserUploadFilesDtoFromFiles(
    files: any,
  ): Promise<CreateOrUpdateUserUploadFilesDto> {
    const createOrUpdateUserUploadFilesDto =
      new CreateOrUpdateUserUploadFilesDto();
    createOrUpdateUserUploadFilesDto.image = UploadImageDto.fromFile(
      files?.image,
    );
    await validateDto(createOrUpdateUserUploadFilesDto);
    if (createOrUpdateUserUploadFilesDto.image)
      await saveFile(
        Constants.usersImagesPath,
        createOrUpdateUserUploadFilesDto.image.name,
        createOrUpdateUserUploadFilesDto.image,
      );
    return createOrUpdateUserUploadFilesDto;
  }
}
