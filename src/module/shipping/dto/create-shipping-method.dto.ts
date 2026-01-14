import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateShippingMethodDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  deliveryDays?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
