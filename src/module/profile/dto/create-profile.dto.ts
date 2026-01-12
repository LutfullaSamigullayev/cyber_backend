import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProfileDto {
  @ApiPropertyOptional({ example: "Lutfulla" })
  firstName?: string;

  @ApiPropertyOptional({ example: "Samigullayev" })
  lastName?: string;

  @ApiPropertyOptional({ example: "+998901234567" })
  phone?: string;

  @ApiPropertyOptional({ example: "avatar.png" })
  avatar?: string;
}
