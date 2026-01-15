import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart, CartStatus } from "./entities/cart.entity";
import { CartItem } from "./entities/cart-item.entity";
import { Product } from "../product/entities/product.entity";
import { AddToCartDto } from "./dto/add-to-cart.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getActiveCart(userId: number) {
    let cart = await this.cartRepo.findOne({
      where: { user: { id: userId }, status: CartStatus.ACTIVE },
      relations: ["items", "items.product"],
    });

    if (!cart) {
      cart = this.cartRepo.create({
        user: { id: userId } as any,
      });
      await this.cartRepo.save(cart);
    }

    return cart;
  }

  async addToCart(userId: number, dto: AddToCartDto) {
    const cart = await this.getActiveCart(userId);

    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    let item = cart.items?.find(
      (i) => i.product.id === product.id,
    );

    if (item) {
      item.quantity += dto.quantity;
    } else {
      item = this.cartItemRepo.create({
        cart,
        product,
        quantity: dto.quantity,
      });
      cart.items = [...(cart.items || []), item];
    }

    await this.cartRepo.save(cart);
    return cart;
  }

  async updateItem(itemId: number, quantity: number) {
    const item = await this.cartItemRepo.findOne({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException("Cart item not found");
    }

    item.quantity = quantity;
    return this.cartItemRepo.save(item);
  }

  async removeItem(itemId: number) {
    const item = await this.cartItemRepo.findOne({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException("Cart item not found");
    }

    await this.cartItemRepo.remove(item);
    return { message: "Item removed" };
  }
}
