import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean = true;
} 