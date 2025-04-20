import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('test')
  async testNotification(
    @Body() data: { email: string; subject: string; message: string },
  ) {
    return this.notificationService.sendEmail(
      data.email,
      data.subject,
      data.message,
    );
  }

  @RabbitSubscribe({
    exchange: 'order.exchange',
    routingKey: '',
    queue: 'order.notification.queue',
  })
  async handleOrderStatusChange(data: {
    orderId: string;
    status: string;
    customerEmail: string;
  }) {
    const subject = `Order ${data.orderId} Status Update`;
    const message = `Your order status has been updated to: ${data.status}`;
    
    return this.notificationService.sendEmail(
      data.customerEmail,
      subject,
      message,
    );
  }
} 