import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({
    example: "lutfulla@gmail.com",
    description: "Foydalanuvchi emaili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "123456",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
