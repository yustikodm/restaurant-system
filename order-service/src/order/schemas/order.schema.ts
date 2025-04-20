import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Menu } from '../../menu/schemas/menu.schema';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSED = 'Processed',
}

@Schema()
class OrderItem {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Menu', required: true })
  menuId: Menu;

  @Prop({ required: true })
  quantity: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: [{ type: OrderItem }], required: true })
  items: OrderItem[];

  @Prop({ required: true })
  customerEmail: string;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop()
  totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order); 