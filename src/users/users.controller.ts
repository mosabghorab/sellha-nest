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
import { ApiResponse } from 'src/config/classes/api-response';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.USERS,
  })
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles() files?: any,
  ) {
    return new ApiResponse(
      true,
      'User created successfully',
      200,
      await this.usersService.create(createUserDto, files),
    );
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.USERS,
  })
  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All users',
      200,
      await this.usersService.findAll(),
    );
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.USERS,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
    @UploadedFiles() files?: any,
  ) {
    return new ApiResponse(
      true,
      'User updated successfully',
      200,
      await this.usersService.update(id, body, files),
    );
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.USERS,
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'User deleted successfully',
      200,
      await this.usersService.delete(id),
    );
  }
}
