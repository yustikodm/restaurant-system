import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'order.exchange',
          type: 'fanout',
        },
      ],
      uri: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    }),
    MenuModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {} 