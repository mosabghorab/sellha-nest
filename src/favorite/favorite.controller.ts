import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { ApiResponse } from '../config/classes/api-response';
import { FavoriteService } from './favorite.service';

@UseGuards(AuthGuard)
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  async getMyFavorite(@CurrentUser() user: any) {
    return new ApiResponse(
      true,
      'My favorite',
      200,
      await this.favoriteService.find(user.id),
    );
  }

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
