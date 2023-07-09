import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Public } from '../config/metadata/public.metadata';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { SettingDto } from './dto/setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.SETTINGS,
  })
  @Serialize(SettingDto, 'Setting created successfully.')
  @Post()
  async create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @Public()
  @Serialize(SettingDto, 'All settings.')
  @Get()
  async findAll() {
    return this.settingsService.findAll();
  }

  @Public()
  @Serialize(SettingDto, 'One setting.')
  @Get(':key')
  async findOne(@Param('key') key: string) {
    return this.settingsService.findOneByKey(key);
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.SETTINGS,
  })
  @Serialize(SettingDto, 'Setting updated successfully.')
  @Patch(':key')
  update(
    @Param('key') key: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingsService.update(key, updateSettingDto);
  }
}
