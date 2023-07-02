import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiResponse } from 'src/config/classes/api-response';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { CurrentUser } from './custom-decorators/current-user-decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateOrUpdateUserUploadFilesDto } from './dtos/create-or-update-user-upload-files.dto';

@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @UploadedFiles() files?: any) {
    return new ApiResponse(
      true,
      'User created successfully',
      200,
      await this.usersService.create(createUserDto, files),
    );
  }

  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All users',
      200,
      await this.usersService.findAll(),
    );
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDto, @UploadedFiles() files?: any) {
    return new ApiResponse(
      true,
      'User updated successfully',
      200,
      await this.usersService.update(id, body, files),
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'User deleted successfully',
      200,
      await this.usersService.delete(id),
    );
  }
}
