import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiResponse } from 'src/config/classes/api-response';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { CurrentUser } from './custom-decorators/current-user-decorator';
import { UpdateUserDto } from './dtos/update-user.dto';

@UseGuards(AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() body: CreateUserDto) {
  //   return new ApiResponse(
  //     true,
  //     'User created successfully',
  //     200,
  //     await this.usersService.create(body),
  //   );
  // }
  //
  // @Get()
  // async getAll() {
  //   return new ApiResponse(
  //     true,
  //     'All users',
  //     200,
  //     await this.usersService.findAll(),
  //   );
  // }
  //
  // @Patch(':id')
  // async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
  //   return new ApiResponse(
  //     true,
  //     'User updated successfully',
  //     200,
  //     await this.usersService.update(id, body),
  //   );
  // }
  //
  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return new ApiResponse(
  //     true,
  //     'User deleted successfully',
  //     200,
  //     await this.usersService.delete(id),
  //   );
  // }
}
