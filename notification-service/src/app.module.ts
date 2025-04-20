import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'order.exchange',
          type: 'fanout',
        },
      ],
      uri: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
