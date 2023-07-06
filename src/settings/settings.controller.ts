import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ApiResponse } from '../config/classes/api-response';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Public } from '../config/metadata/public.metadata';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.SETTINGS,
  })
  @Post()
  async create(@Body() createSettingDto: CreateSettingDto) {
    return new ApiResponse(
      true,
      'Setting created successfully',
      200,
      await this.settingsService.create(createSettingDto),
    );
  }

  @Public()
  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All settings',
      200,
      await this.settingsService.findAll(),
    );
  }

  @Public()
  @Get(':key')
  async findOne(@Param('key') key: string) {
    return new ApiResponse(
      true,
      'show setting',
      200,
      await this.settingsService.findOneByKey(key),
    );
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.SETTINGS,
  })
  @Patch(':key')
  update(
    @Param('key') key: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingsService.update(key, updateSettingDto);
  }
}
