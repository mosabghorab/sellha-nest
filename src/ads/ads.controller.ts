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
import { AdsService } from './ads.service';
import { UpdateAdDto } from './dtos/update-ad.dto';
import { ApiResponse } from 'src/config/classes/api-response';
import { CreateAdDto } from './dtos/create-ad.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Public } from '../config/metadata/public.metadata';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.ADS,
  })
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

  @Public()
  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'getting all ads successfully',
      200,
      await this.adsService.findAll(),
    );
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.ADS,
  })
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

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.ADS,
  })
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
