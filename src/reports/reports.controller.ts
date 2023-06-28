import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiResponse } from '../config/classes/api-response';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    return new ApiResponse(
      true,
      'Report created successfully',
      200,
      await this.reportsService.create(createReportDto),
    );
  }

  @UseGuards(AdminGuard)
  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All reports',
      200,
      await this.reportsService.findAll(),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'All reports',
      200,
      await this.reportsService.findOneById(id),
    );
  }

  @UseGuards(AdminGuard)
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
