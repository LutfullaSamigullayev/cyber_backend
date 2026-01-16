import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateCommentDto {
  @ApiProperty({ example: 10 })
  @IsInt()
  productId: number;

  @ApiProperty({ example: "Mahsulot sifati juda zo‘r" })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: ["https://img.com/1.jpg"],
    required: false,
  })
  @IsOptional()
  @IsArray()
  images?: string[];
}
