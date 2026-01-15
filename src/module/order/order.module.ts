import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { Product } from "../product/entities/product.entity";
import { OrderItem } from "./entities/order-item.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
