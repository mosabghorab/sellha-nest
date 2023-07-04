import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { ApiResponse } from '../config/classes/api-response';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.ROLES,
  })
  @Post()
  async create(@Body() createAdDto: CreateRoleDto) {
    return new ApiResponse(
      true,
      'Role created successfully',
      200,
      await this.rolesService.create(createAdDto),
    );
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.ROLES,
  })
  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All roles',
      200,
      await this.rolesService.findAll(),
    );
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.ROLES,
  })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return new ApiResponse(
      true,
      'Role updated successfully',
      200,
      await this.rolesService.update(id, updateRoleDto),
    );
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.ROLES,
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Role deleted successfully',
      200,
      await this.rolesService.remove(id),
    );
  }
}
