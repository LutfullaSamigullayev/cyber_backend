import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { FavoritesService } from "./favorite.service";

@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // ❤️ Add
  @Post(":productId")
  add(
    @CurrentUser("profileId") profileId: number,
    @Param("productId", ParseIntPipe) productId: number,
  ) {
    return this.favoritesService.addToFavorites(profileId, productId);
  }

  // 💔 Remove
  @Delete(":productId")
  remove(
    @CurrentUser("profileId") profileId: number,
    @Param("productId", ParseIntPipe) productId: number,
  ) {
    return this.favoritesService.removeFromFavorites(profileId, productId);
  }

  // 📦 Get all
  @Get()
  getMyFavorites(
    @CurrentUser("profileId") profileId: number,
  ) {
    return this.favoritesService.getMyFavorites(profileId);
  }
}
