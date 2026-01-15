import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { Cart } from "./entities/cart.entity";
import { CartItem } from "./entities/cart-item.entity";
import { Product } from "../product/entities/product.entity";
import { ProfileModule } from "../profile/profile.module"; // ✅

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Product]),
    ProfileModule, // 🔴 SHART
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
