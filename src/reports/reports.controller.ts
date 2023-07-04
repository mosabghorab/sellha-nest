import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ApiResponse } from '../config/classes/api-response';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.REPORTS,
  })
  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    return new ApiResponse(
      true,
      'Report created successfully',
      200,
      await this.reportsService.create(createReportDto),
    );
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.REPORTS,
  })
  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All reports',
      200,
      await this.reportsService.findAll(),
    );
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.REPORTS,
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'show report',
      200,
      await this.reportsService.findOneById(id),
    );
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.REPORTS,
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Report deleted successfully',
      200,
      await this.reportsService.remove(id),
    );
  }
}
