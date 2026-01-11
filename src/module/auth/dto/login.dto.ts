import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "lutfulla@gmail.com",
    description: "Foydalanuvchi emaili",
  })
  @IsEmail()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "123456",
    minLength: 6,
  })
  @IsString()
  password: string;
}
