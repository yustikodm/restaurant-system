import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from '../schemas/menu.schema';
import { MenuSeeder } from './menu.seed';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
  ],
  providers: [MenuSeeder],
  exports: [MenuSeeder],
})
export class SeederModule {} 