import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  home?: string;

  @IsOptional()
  @IsBoolean()
  isMain?: boolean;
}
