import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { Product } from "../product/entities/product.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderItem } from "./entities/order-item.entity";
import { Profile } from "src/module/profile/entities/profile.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly itemRepo: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(profile: Profile, dto: CreateOrderDto) {
    let total = 0;
    const items: OrderItem[] = [];

    for (const i of dto.items) {
      const product = await this.productRepo.findOne({
        where: { id: i.productId },
      });

      if (!product) {
        throw new ForbiddenException("Product topilmadi");
      }

      total += Number(product.price) * i.quantity;

      items.push(
        this.itemRepo.create({
          product,
          quantity: i.quantity,
          price: product.price,
        }),
      );
    }

    const order = this.orderRepo.create({
      profile,
      items,
      totalPrice: total,
    });

    return this.orderRepo.save(order);
  }

  findMyOrders(profileId: number) {
    return this.orderRepo.find({
      where: { profile: { id: profileId } },
      relations: ["items", "items.product"],
    });
  }

  async findOne(id: number, profileId: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ["profile", "items", "items.product"],
    });

    if (!order || order.profile.id !== profileId) {
      throw new ForbiddenException();
    }

    return order;
  }
}
