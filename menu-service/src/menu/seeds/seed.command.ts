import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { MenuSeeder } from './menu.seed';

@Injectable()
export class SeedCommand {
  constructor(private readonly menuSeeder: MenuSeeder) {}

  @Command({
    command: 'seed:menu',
    describe: 'Seed the menu with initial data',
  })
  async seedMenu() {
    try {
      await this.menuSeeder.seed();
      console.log('Menu seeding completed successfully');
    } catch (error) {
      console.error('Error seeding menu:', error);
      process.exit(1);
    }
  }
} 