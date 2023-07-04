import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ApiResponse } from 'src/config/classes/api-response';
import { CurrentUser } from 'src/users/custom-decorators/current-user-decorator';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.COMMENTS,
  })
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return new ApiResponse(
      true,
      'comment created successfully',
      200,
      await this.commentsService.create(createCommentDto),
    );
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.COMMENTS,
  })
  @Get()
  async findAll(@CurrentUser() user: any) {
    return new ApiResponse(
      true,
      'getting all comments successfully',
      200,
      await this.commentsService.findAll(user.id),
    );
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.COMMENTS,
  })
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
