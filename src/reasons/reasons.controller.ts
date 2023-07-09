import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReasonsService } from './reasons.service';
import { CreateReasonDto } from './dtos/create-reason.dto';
import { UpdateReasonDto } from './dtos/update-reason.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Public } from '../config/metadata/public.metadata';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { ReasonDto } from './dtos/reason.dto';

@Controller('reasons')
export class ReasonsController {
  constructor(private readonly reasonsService: ReasonsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.REASONS,
  })
  @Serialize(ReasonDto, 'Reason created successfully.')
  @Post()
  async create(@Body() createReasonDto: CreateReasonDto) {
    return this.reasonsService.create(createReasonDto);
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.REASONS,
  })
  @Serialize(ReasonDto, 'Reason updated successfully.')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateReasonDto: UpdateReasonDto,
  ) {
    return this.reasonsService.update(id, updateReasonDto);
  }

  @Public()
  @Serialize(ReasonDto, 'All reasons.')
  @Get()
  async getAll() {
    return this.reasonsService.findAll();
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.REASONS,
  })
  @Serialize(ReasonDto, 'Reason deleted successfully.')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.reasonsService.delete(id);
  }
}
