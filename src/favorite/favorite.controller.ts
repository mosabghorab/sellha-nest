import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { ApiResponse } from '../config/classes/api-response';
import { FavoriteService } from './favorite.service';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.FAVORITE,
  })
  @Get()
  async getMyFavorite(@CurrentUser() user: any) {
    return new ApiResponse(
      true,
      'My favorite',
      200,
      await this.favoriteService.find(user.id),
    );
  }

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.FAVORITE,
  })
  @Post(':id')
  async addToFavorite(
    @CurrentUser() user: any,
    @Param('id') productId: number,
  ) {
    return new ApiResponse(
      true,
      'Product added to favorite successfully',
      200,
      await this.favoriteService.add(user.id, productId),
    );
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.FAVORITE,
  })
  @Delete(':id')
  async removeFromFavorite(
    @CurrentUser() user: any,
    @Param('id') productId: number,
  ) {
    return new ApiResponse(
      true,
      'Product removed from favorite successfully',
      200,
      await this.favoriteService.remove(user.id, productId),
    );
  }
}
