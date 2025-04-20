import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MenuService } from './menu/menu.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const menuService = app.get(MenuService);

  // Sample menu items
  const menuItems = [
    {
      name: 'Margherita Pizza',
      description: 'Classic Italian pizza with tomatoes and mozzarella',
      price: 12.99,
      category: 'Pizza',
      isAvailable: true,
    },
    {
      name: 'Pepperoni Pizza',
      description: 'Pizza topped with pepperoni and cheese',
      price: 14.99,
      category: 'Pizza',
      isAvailable: true,
    },
    {
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing',
      price: 8.99,
      category: 'Salad',
      isAvailable: true,
    },
    {
      name: 'Greek Salad',
      description: 'Mediterranean salad with feta cheese and olives',
      price: 9.99,
      category: 'Salad',
      isAvailable: true,
    },
    {
      name: 'Spaghetti Carbonara',
      description: 'Classic Italian pasta with creamy sauce',
      price: 13.99,
      category: 'Pasta',
      isAvailable: true,
    },
    {
      name: 'Fettuccine Alfredo',
      description: 'Pasta in rich Alfredo sauce',
      price: 12.99,
      category: 'Pasta',
      isAvailable: true,
    },
    {
      name: 'Classic Burger',
      description: 'Beef patty with lettuce, tomato, and cheese',
      price: 11.99,
      category: 'Burgers',
      isAvailable: true,
    },
    {
      name: 'Veggie Burger',
      description: 'Plant-based patty with fresh vegetables',
      price: 10.99,
      category: 'Burgers',
      isAvailable: false, // Testing unavailable items
    },
    {
      name: 'Chocolate Cake',
      description: 'Rich chocolate layer cake',
      price: 6.99,
      category: 'Desserts',
      isAvailable: true,
    },
    {
      name: 'Tiramisu',
      description: 'Classic Italian coffee-flavored dessert',
      price: 7.99,
      category: 'Desserts',
      isAvailable: true,
    },
  ];

  console.log('Starting to seed menu items...');

  try {
    // Clear existing menu items
    await menuService.removeAll();
    console.log('Cleared existing menu items');

    // Insert new menu items
    for (const item of menuItems) {
      await menuService.create(item);
      console.log(`Created menu item: ${item.name}`);
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  }

  await app.close();
}

bootstrap(); 