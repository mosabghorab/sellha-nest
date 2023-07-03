import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFiles } from '@nestjs/common';
import { AdsService } from './ads.service';
import { UpdateAdDto } from './dto/update-ad.dto';
import { ApiResponse } from 'src/config/classes/api-response';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateAdDto } from './dto/create-ad.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) { }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createAdDto: CreateAdDto, @UploadedFiles() files: any) {
    console.log(files);
    return new ApiResponse(
      true,
      'ad created successfully',
      200,
      await this.adsService.create(createAdDto, files),
    );
  }


  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'getting all ads successfully',
      200,
      await this.adsService.findAll(),
    );
  }


  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAdDto: UpdateAdDto,
    @UploadedFiles() files: any,
  ) {
    return new ApiResponse(
      true,
      'Ad updated successfully',
      200,
      await this.adsService.update(id, updateAdDto, files),
    );
  }
  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'ad deleted successfully',
      200,
      await this.adsService.remove(id),
    );
  }
}
