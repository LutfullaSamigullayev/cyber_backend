import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

import { CartService } from "./cart.service";
import { AddToCartDto } from "./dto/add-to-cart.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";

import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { ProfileOwnerGuard } from "src/common/guards/profile-owner.guard";
import { UserRole } from "src/common/constants/role";

@ApiTags("Cart")
@ApiBearerAuth()
@UseGuards(RolesGuard, ProfileOwnerGuard)
@Roles(UserRole.ADMIN, UserRole.USER)
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // 🔹 GET ACTIVE CART
  @Get(":profileId")
  @ApiOperation({ summary: "Get active cart by profileId" })
  @ApiParam({ name: "profileId", example: 1 })
  @ApiResponse({ status: 200, description: "Active cart returned" })
  getMyCart(
    @Param("profileId", ParseIntPipe) profileId: number,
  ) {
    return this.cartService.getActiveCart(profileId);
  }

  // 🔹 ADD PRODUCT TO CART
  @Post(":profileId/add")
  @ApiOperation({ summary: "Add product to cart" })
  @ApiParam({ name: "profileId", example: 1 })
  @ApiResponse({ status: 201, description: "Product added to cart" })
  addToCart(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() dto: AddToCartDto,
  ) {
    return this.cartService.addToCart(profileId, dto);
  }

  // 🔹 UPDATE CART ITEM
  @Patch("item/:id")
  @ApiOperation({ summary: "Update cart item quantity" })
  @ApiParam({ name: "id", example: 5 })
  @ApiResponse({ status: 200, description: "Cart item updated" })
  @ApiResponse({ status: 404, description: "Cart item not found" })
  updateItem(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(id, dto.quantity);
  }

  // 🔹 REMOVE CART ITEM
  @Delete("item/:id")
  @ApiOperation({ summary: "Remove item from cart" })
  @ApiParam({ name: "id", example: 5 })
  @ApiResponse({ status: 200, description: "Item removed from cart" })
  @ApiResponse({ status: 404, description: "Cart item not found" })
  removeItem(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.cartService.removeItem(id);
  }
}
