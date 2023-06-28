import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiResponse } from '../config/classes/api-response';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return new ApiResponse(
      true,
      'Order created successfully',
      200,
      await this.ordersService.create(user.id, createOrderDto),
    );
  }

  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All orders',
      200,
      await this.ordersService.findAll(),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Show order',
      200,
      await this.ordersService.findOneById(id),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return new ApiResponse(
      true,
      'Order updated successfully',
      200,
      await this.ordersService.update(id, updateOrderDto),
    );
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Order deleted successfully',
      200,
      await this.ordersService.remove(id),
    );
  }
}
