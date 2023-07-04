import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '../config/classes/api-response';
import { ReasonsService } from './reasons.service';
import { CreateReasonDto } from './dtos/create-reason.dto';
import { UpdateReasonDto } from './dtos/update-reason.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Public } from '../config/metadata/public.metadata';

@Controller('reasons')
export class ReasonsController {
  constructor(private readonly reasonsService: ReasonsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.REASONS,
  })
  @Post()
  async create(@Body() createReasonDto: CreateReasonDto) {
    return new ApiResponse(
      true,
      'Reason created successfully',
      200,
      await this.reasonsService.create(createReasonDto),
    );
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.REASONS,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReasonDto: UpdateReasonDto,
  ) {
    return new ApiResponse(
      true,
      'Reason updated successfully',
      200,
      await this.reasonsService.update(id, updateReasonDto),
    );
  }

  @Public()
  @Get()
  async getAll() {
    return new ApiResponse(
      true,
      'All reasons',
      200,
      await this.reasonsService.findAll(),
    );
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.REASONS,
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Reason deleted successfully',
      200,
      await this.reasonsService.delete(id),
    );
  }
}
