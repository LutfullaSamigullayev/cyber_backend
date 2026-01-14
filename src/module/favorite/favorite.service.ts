import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Favorite } from "./entities/favorite.entity";
import { Product } from "../product/entities/product.entity";
import { Profile } from "../profile/entities/profile.entity";

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepo: Repository<Favorite>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
  ) {}

  // ❤️ Add to favorites
  async addToFavorites(profileId: number, productId: number) {
    const profile = await this.profileRepo.findOne({
      where: { id: profileId },
    });

    if (!profile) throw new NotFoundException("Profile not found");

    const product = await this.productRepo.findOne({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException("Product not found");

    let favorite = await this.favoriteRepo.findOne({
      where: { profile: { id: profileId } },
      relations: ["products"],
    });

    if (!favorite) {
      favorite = this.favoriteRepo.create({
        profile,
        products: [product],
      });
    } else {
      const exists = favorite.products.some((p) => p.id === productId);
      if (!exists) {
        favorite.products.push(product);
      }
    }

    return this.favoriteRepo.save(favorite);
  }

  // 💔 Remove from favorites
  async removeFromFavorites(profileId: number, productId: number) {
    const favorite = await this.favoriteRepo.findOne({
      where: { profile: { id: profileId } },
      relations: ["products"],
    });

    if (!favorite) throw new NotFoundException("Favorites not found");

    favorite.products = favorite.products.filter(
      (p) => p.id !== productId,
    );

    return this.favoriteRepo.save(favorite);
  }

  // 📦 Get all favorite products
  async getMyFavorites(profileId: number) {
    const favorite = await this.favoriteRepo.findOne({
      where: { profile: { id: profileId } },
      relations: ["products"],
    });

    return favorite?.products || [];
  }
}
