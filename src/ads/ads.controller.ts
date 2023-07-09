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
import { CreateAdDto } from './dtos/create-ad.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Public } from '../config/metadata/public.metadata';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { AdDto } from './dtos/ad.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.ADS,
  })
  @Serialize(AdDto, 'Ad created successfully.')
  @Post()
  async create(@Body() createAdDto: CreateAdDto, @UploadedFiles() files: any) {
    return this.adsService.create(createAdDto, files);
  }

  @Public()
  @Serialize(AdDto, 'All ads.')
  @Get()
  async findAll() {
    return this.adsService.findAll();
  }

  @Public()
  @Serialize(AdDto, 'One ad.')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.adsService.findOneById(id);
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.ADS,
  })
  @Serialize(AdDto, 'Ad updated successfully.')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAdDto: UpdateAdDto,
    @UploadedFiles() files: any,
  ) {
    return this.adsService.update(id, updateAdDto, files);
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.ADS,
  })
  @Serialize(AdDto, 'Ad deleted successfully.')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.adsService.remove(id);
  }
}
