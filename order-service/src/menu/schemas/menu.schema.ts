import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: true })
  isAvailable: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu); 