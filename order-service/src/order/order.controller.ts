import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './schemas/order.schema';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    return this.orderService.create({
      customerEmail: createOrderDto.customerEmail,
      items: createOrderDto.items
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderDocument> {
    return this.orderService.findById(id);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ): Promise<OrderDocument> {
    return this.orderService.updateStatus(id, status);
  }
} 