import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from '../schemas/menu.schema';

@Injectable()
export class MenuSeeder {
  constructor(
    @InjectModel(Menu.name) private readonly menuModel: Model<Menu>,
  ) {}

  async seed() {
    const menuItems = [
      {
        name: 'Margherita Pizza',
        description: 'Classic Italian pizza with tomatoes and mozzarella',
        price: 12.99,
        isAvailable: true,
      },
      {
        name: 'Pepperoni Pizza',
        description: 'Pizza topped with pepperoni and cheese',
        price: 14.99,
        isAvailable: true,
      },
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing',
        price: 8.99,
        isAvailable: true,
      },
      {
        name: 'Chicken Alfredo',
        description: 'Fettuccine pasta with creamy Alfredo sauce and grilled chicken',
        price: 16.99,
        isAvailable: true,
      },
      {
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with chocolate ganache',
        price: 6.99,
        isAvailable: true,
      },
      {
        name: 'Tiramisu',
        description: 'Classic Italian dessert with coffee and mascarpone',
        price: 7.99,
        isAvailable: true,
      },
      {
        name: 'Garlic Bread',
        description: 'Toasted bread with garlic butter',
        price: 4.99,
        isAvailable: true,
      },
      {
        name: 'Coke',
        description: 'Ice-cold Coca-Cola',
        price: 2.99,
        isAvailable: true,
      },
      {
        name: 'Water',
        description: 'Mineral water',
        price: 1.99,
        isAvailable: true,
      },
      {
        name: 'Ice Cream',
        description: 'Vanilla ice cream with chocolate sauce',
        price: 5.99,
        isAvailable: true,
      },
    ];

    try {
      // Clear existing menu items
      await this.menuModel.deleteMany({});
      
      // Insert new menu items
      await this.menuModel.insertMany(menuItems);
      
      console.log('Menu seeding completed successfully');
    } catch (error) {
      console.error('Error seeding menu:', error);
      throw error;
    }
  }
} 