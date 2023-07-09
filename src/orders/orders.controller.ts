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
import { CurrentUser } from '../users/custom-decorators/current-user-decorator';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Strict } from '../config/metadata/strict.metadata';
import { PermissionAction } from '../permissions/enums/permission-action-enum';
import { PermissionGroup } from '../permissions/enums/permission-group-enum';
import { Serialize } from '../config/interceptors/serialize.interceptor';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Strict({
    permissionAction: PermissionAction.CREATE,
    permissionGroup: PermissionGroup.ORDERS,
  })
  @Serialize(OrderDto, 'Order created successfully.')
  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(user.id, createOrderDto);
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.ORDERS,
  })
  @Serialize(OrderDto, 'All orders.')
  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  @Strict({
    permissionAction: PermissionAction.VIEW,
    permissionGroup: PermissionGroup.ORDERS,
  })
  @Serialize(OrderDto, 'One order.')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ordersService.findOneById(id);
  }

  @Strict({
    permissionAction: PermissionAction.UPDATE,
    permissionGroup: PermissionGroup.ORDERS,
  })
  @Serialize(OrderDto, 'Order updated successfully.')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Strict({
    permissionAction: PermissionAction.DELETE,
    permissionGroup: PermissionGroup.ORDERS,
  })
  @Serialize(OrderDto, 'Order deleted successfully.')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
