import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.REPORTS,
  })
  @Serialize(ReportDto, 'Report created successfully.')
  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.REPORTS,
  })
  @Serialize(ReportDto, 'All reports.')
  @Get()
  async findAll() {
    return this.reportsService.findAll();
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.REPORTS,
  })
  @Serialize(ReportDto, 'One report.')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.reportsService.findOneById(id);
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.REPORTS,
  })
  @Serialize(ReportDto, 'Report deleted successfully.')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.reportsService.remove(id);
  }
}
