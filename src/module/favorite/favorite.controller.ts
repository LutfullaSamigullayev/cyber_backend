import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { FavoritesService } from "./favorite.service";
import { Product } from "../product/entities/product.entity";

@ApiTags("Favorites")
@ApiBearerAuth("access-token")
@Controller("favorites")
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // ❤️ Add to favorites
  @Post(":productId")
  @ApiOperation({ summary: "Add product to favorites" })
  @ApiParam({ name: "productId", example: 12 })
  @ApiResponse({
    status: 201,
    description: "Product added to favorites",
  })
  add(
    @CurrentUser("profileId") profileId: number,
    @Param("productId", ParseIntPipe) productId: number,
  ) {
    return this.favoritesService.addToFavorites(profileId, productId);
  }

  // 💔 Remove from favorites
  @Delete(":productId")
  @ApiOperation({ summary: "Remove product from favorites" })
  @ApiParam({ name: "productId", example: 12 })
  @ApiResponse({
    status: 200,
    description: "Product removed from favorites",
  })
  remove(
    @CurrentUser("profileId") profileId: number,
    @Param("productId", ParseIntPipe) productId: number,
  ) {
    return this.favoritesService.removeFromFavorites(profileId, productId);
  }

  // 📦 Get my favorites
  @Get()
  @ApiOperation({ summary: "Get my favorite products" })
  @ApiResponse({
    status: 200,
    description: "List of favorite products",
    type: [Product],
  })
  getMyFavorites(
    @CurrentUser("profileId") profileId: number,
  ) {
    return this.favoritesService.getMyFavorites(profileId);
  }
}
