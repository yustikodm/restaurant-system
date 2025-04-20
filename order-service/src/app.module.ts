import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant'),
    OrderModule,
    MenuModule,
  ],
})
export class AppModule {}
