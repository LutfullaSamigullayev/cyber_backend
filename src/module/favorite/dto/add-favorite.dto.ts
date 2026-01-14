import { IsInt } from "class-validator";

export class AddFavoriteDto {
  @IsInt()
  productId: number;
}
