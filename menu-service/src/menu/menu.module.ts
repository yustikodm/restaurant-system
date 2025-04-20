import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './schemas/menu.schema';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { SeederModule } from './seeds/seeder.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    SeederModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {} 