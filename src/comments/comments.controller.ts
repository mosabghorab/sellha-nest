import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { CurrentUser } from 'src/users/custom-decorators/current-user-decorator';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { CommentDto } from './dtos/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.COMMENTS,
  })
  @Serialize(CommentDto, 'Comment created successfully.')
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.COMMENTS,
  })
  @Serialize(CommentDto, 'All comments.')
  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.commentsService.findAll(user.id);
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.COMMENTS,
  })
  @Serialize(CommentDto, 'One comment.')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.commentsService.findOneById(id);
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.COMMENTS,
  })
  @Serialize(CommentDto, 'Comment deleted successfully.')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
