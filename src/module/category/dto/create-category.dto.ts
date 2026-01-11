import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl, Length } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Electronics",
    minLength: 3,
    maxLength: 50,
    description: "Kategoriya nomi",
  })
  @IsString()
  @Length(3, 50)
  name: string;

  @ApiProperty({
    example: "https://example.com/image.png",
    description: "Kategoriya rasmi (URL)",
  })
  @IsUrl()
  img: string;
}
