import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @ApiProperty({
    example: "Uzbekistan",
    description: "Davlat nomi",
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: "Tashkent",
    description: "Shahar nomi",
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: "Chilonzor",
    description: "Tuman nomi",
  })
  @IsString()
  district: string;

  @ApiProperty({
    example: "Bunyodkor ko‘chasi",
    description: "Ko‘cha nomi",
  })
  @IsString()
  street: string;

  @ApiPropertyOptional({
    example: "12A",
    description: "Uy yoki xonadon raqami",
  })
  @IsOptional()
  @IsString()
  home?: string;

  @ApiPropertyOptional({
    example: true,
    description: "Asosiy (main) addressmi yoki yo‘q",
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isMain?: boolean;
}
