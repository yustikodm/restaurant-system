import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './schemas/menu.schema';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Menu> {
    const menu = await this.menuService.findById(id);
    if (!menu) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    return menu;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() menu: Menu): Promise<Menu> {
    return this.menuService.create(menu);
  }

  @Post('seed')
  @HttpCode(HttpStatus.CREATED)
  async seedMenu(): Promise<void> {
    await this.menuService.seedMenu();
  }
} 