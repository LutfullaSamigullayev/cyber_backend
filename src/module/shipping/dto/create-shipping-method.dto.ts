import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateShippingMethodDto {
  @ApiProperty({ example: "Express Shipping" })
  @IsString()
  name: string;

  @ApiProperty({ example: "express" })
  @IsString()
  code: string;

  @ApiProperty({ example: 8.5 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  deliveryDays?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
