import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "./entities/favorite.entity";
import { Product } from "../product/entities/product.entity";
import { Profile } from "../profile/entities/profile.entity";
import { FavoritesController } from "./favorite.controller";
import { FavoritesService } from "./favorite.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite, Product, Profile]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
