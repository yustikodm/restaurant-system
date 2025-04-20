import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu, MenuDocument } from './schemas/menu.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<MenuDocument>,
  ) {}

  async findAll(): Promise<Menu[]> {
    return this.menuModel.find({ isAvailable: true }).exec();
  }

  async findById(id: string): Promise<Menu | null> {
    return this.menuModel.findById(id).exec();
  }

  async create(menu: Menu): Promise<Menu> {
    const createdMenu = new this.menuModel(menu);
    return createdMenu.save();
  }

  async seedMenu() {
    const menuItems = [
      { name: 'Margherita Pizza', price: 12.99, isAvailable: true },
      { name: 'Chicken Burger', price: 8.99, isAvailable: true },
      { name: 'Caesar Salad', price: 6.99, isAvailable: true },
      { name: 'Pasta Carbonara', price: 11.99, isAvailable: true },
      { name: 'Chocolate Cake', price: 5.99, isAvailable: true },
    ];

    for (const item of menuItems) {
      const exists = await this.menuModel.findOne({ name: item.name });
      if (!exists) {
        await this.create(item);
      }
    }
  }
} 