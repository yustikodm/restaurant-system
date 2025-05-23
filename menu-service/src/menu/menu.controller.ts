import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './schemas/menu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Menu> {
    const menu = await this.menuService.findById(id);
    if (!menu) {
      throw new NotFoundException('Menu item not found');
    }
    return menu;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuDto: Partial<Menu>,
  ): Promise<Menu> {
    const menu = await this.menuService.update(id, updateMenuDto);
    if (!menu) {
      throw new NotFoundException('Menu item not found');
    }
    return menu;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Menu> {
    const menu = await this.menuService.remove(id);
    if (!menu) {
      throw new NotFoundException('Menu item not found');
    }
    return menu;
  }
} 