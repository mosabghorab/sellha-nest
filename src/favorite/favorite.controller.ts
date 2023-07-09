import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { FavoriteService } from './favorite.service';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { FavoriteDto } from './dtos/favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.FAVORITE,
  })
  @Serialize(FavoriteDto, 'My favorites.')
  @Get()
  async getMyFavorite(@CurrentUser() user: any) {
    return this.favoriteService.find(user.id);
  }

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.FAVORITE,
  })
  @Serialize(FavoriteDto, 'Product added to favorite successfully.')
  @Post(':id')
  async addToFavorite(
    @CurrentUser() user: any,
    @Param('id') productId: number,
  ) {
    return this.favoriteService.add(user.id, productId);
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.FAVORITE,
  })
  @Serialize(FavoriteDto, 'Product removed from favorite successfully.')
  @Delete(':id')
  async removeFromFavorite(
    @CurrentUser() user: any,
    @Param('id') productId: number,
  ) {
    return this.favoriteService.remove(user.id, productId);
  }
}
