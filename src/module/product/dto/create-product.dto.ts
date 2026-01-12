import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsObject } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    example: "IPhone 17",
    description: "Mahsulot nomi",
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: "Yangi avlod iPhone 17 modeli",
    description: "Mahsulot tavsifi",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 999.99,
    description: "Mahsulot narxi",
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 50,
    description: "Mahsulot zaxiradagi miqdori",
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    example: { color: "black", storage: "128GB" },
    description: "Qo'shimcha mahsulot atributlari",
    required: false,
  })
  @IsOptional()
  @IsObject()
  attributes?: Record<string, any>;
}
