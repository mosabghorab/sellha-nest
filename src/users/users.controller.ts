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
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.USERS,
  })
  @Serialize(UserDto, 'User created successfully.')
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles() files?: any,
  ) {
    const user = await this.usersService.create(createUserDto, files);
    // trigger user.created event.
    this.eventEmitter.emit(
      'user.created',
      new UserCreatedEvent(user.name, user.email),
    );
    return user;
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.USERS,
  })
  @Serialize(UserDto, 'All users.')
  @Get()
  async findAll() {
    console.log('hello there,');
    return this.usersService.findAll();
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.USERS,
  })
  @Serialize(UserDto, 'One user.')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.USERS,
  })
  @Serialize(UserDto, 'User updated successfully.')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
    @UploadedFiles() files?: any,
  ) {
    return this.usersService.update(id, body, files);
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.USERS,
  })
  @Serialize(UserDto, 'User deleted successfully.')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
