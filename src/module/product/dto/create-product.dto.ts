import { IsString, IsNumber, IsOptional, IsObject } from "class-validator";

export class CreateProductDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsOptional()
  @IsObject()
  attributes?: Record<string, any>;
}
