import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiResponse } from '../config/classes/api-response';
import { UpdateRoleDto } from './dtos/update-role.dto';

@UseGuards(AdminGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createAdDto: CreateRoleDto) {
    return new ApiResponse(
      true,
      'Role created successfully',
      200,
      await this.rolesService.create(createAdDto),
    );
  }

  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All roles',
      200,
      await this.rolesService.findAll(),
    );
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return new ApiResponse(
      true,
      'Role updated successfully',
      200,
      await this.rolesService.update(id, updateRoleDto),
    );
  }

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
