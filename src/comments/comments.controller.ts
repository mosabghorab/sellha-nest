import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { ApiResponse } from 'src/config/classes/api-response';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/users/custom-decorators/current-user-decorator';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return new ApiResponse(
      true,
      'comment created successfully',
      200,
      await this.commentsService.create(createCommentDto),
    );
  }

  @Get()
  async findAll(@CurrentUser() user: any) {
    return new ApiResponse(
      true,
      'getting all comments successfully',
      200,
      await this.commentsService.findAll(user.id),
    );
  }


  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'comment deleted successfully',
      200,
      await this.commentsService.remove(id),
    );
  }
}
