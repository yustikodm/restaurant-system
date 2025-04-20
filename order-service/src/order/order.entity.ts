import { Menu } from './menu.entity';

export class OrderItem {
  menuId: string;
  quantity: number;
  menu?: Menu;
}

export class Order {
  id: string;
  customerEmail: string;
  items: OrderItem[];
  status: string;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
} 