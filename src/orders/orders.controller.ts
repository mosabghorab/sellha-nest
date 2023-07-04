import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiResponse } from '../config/classes/api-response';
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.ORDERS,
  })
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

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.ORDERS,
  })
  @Get()
  async findAll() {
    return new ApiResponse(
      true,
      'All orders',
      200,
      await this.ordersService.findAll(),
    );
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.ORDERS,
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return new ApiResponse(
      true,
      'Show order',
      200,
      await this.ordersService.findOneById(id),
    );
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.ORDERS,
  })
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

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.ORDERS,
  })
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
