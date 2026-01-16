import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { Product } from "../product/entities/product.entity";
import { Order } from "../order/entities/order.entity";
import { OrderItem } from "../order/entities/order-item.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      Product,
      Order,
      OrderItem,
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
