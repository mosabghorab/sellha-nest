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
import { AdminGuard } from '../auth/guards/admin.guard';
import { ApiResponse } from '../config/classes/api-response';
import { ReasonsService } from './reasons.service';
import { CreateReasonDto } from './dtos/create-reason.dto';
import { UpdateReasonDto } from './dtos/update-reason.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('reasons')
export class ReasonsController {
  constructor(private readonly reasonsService: ReasonsService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createReasonDto: CreateReasonDto) {
    return new ApiResponse(
      true,
      'Reason created successfully',
      200,
      await this.reasonsService.create(createReasonDto),
    );
  }

  @UseGuards(AdminGuard)
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

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return new ApiResponse(
      true,
      'All reasons',
      200,
      await this.reasonsService.findAll(),
    );
  }

  @UseGuards(AdminGuard)
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
