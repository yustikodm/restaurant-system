import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus } from './schemas/order.schema';
import { MenuService } from '../menu/menu.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

interface CreateOrderItem {
  menuId: string;
  quantity: number;
}

interface CreateOrderData {
  customerEmail: string;
  items: CreateOrderItem[];
}

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly menuService: MenuService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async create(orderData: CreateOrderData): Promise<OrderDocument> {
    if (!orderData.items || orderData.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    // Calculate total amount
    let totalAmount = 0;
    for (const item of orderData.items) {
      const menu = await this.menuService.findById(item.menuId);
      if (!menu) {
        throw new NotFoundException(`Menu item with ID ${item.menuId} not found`);
      }
      totalAmount += menu.price * item.quantity;
    }

    const order = new this.orderModel({
      customerEmail: orderData.customerEmail,
      items: orderData.items.map(item => ({
        menuId: item.menuId,
        quantity: item.quantity
      })),
      totalAmount,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await order.save();

    // Publish order to RabbitMQ
    await this.amqpConnection.publish('order.exchange', 'order.process', {
      orderId: savedOrder._id,
      status: OrderStatus.PENDING,
    });

    await this.amqpConnection.publish('order.exchange', 'order.confirmation', {
      orderId: savedOrder._id,
      customerEmail: savedOrder.customerEmail,
      items: savedOrder.items,
      totalAmount: savedOrder.totalAmount,
    });

    return savedOrder;
  }

  async findById(id: string): Promise<OrderDocument> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<OrderDocument> {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Publish status update to RabbitMQ
    await this.amqpConnection.publish('order.exchange', 'order.status', {
      orderId: order._id,
      status: order.status,
      customerEmail: order.customerEmail,
    });

    return order;
  }
} 