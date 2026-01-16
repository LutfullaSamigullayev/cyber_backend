import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { User } from "../auth/entities/user.entity";
import { Product } from "../product/entities/product.entity";
import { Order } from "../order/entities/order.entity";
import { OrderItem } from "../order/entities/order-item.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  async create(dto: CreateCommentDto, user: User) {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException("Product topilmadi");
    }

    // 🔐 USER ORDER QILGANMI?
    const ordered = await this.orderItemRepo
      .createQueryBuilder("item")
      .leftJoin("item.order", "order")
      .where("order.userId = :userId", { userId: user.id })
      .andWhere("item.productId = :productId", {
        productId: dto.productId,
      })
      .getOne();

    if (!ordered) {
      throw new ForbiddenException(
        "Bu productni sotib olmasdan comment qoldirib bo‘lmaydi",
      );
    }

    const exists = await this.commentRepo.findOne({
      where: {
        user: { id: user.id },
        product: { id: product.id },
      },
    });

    if (exists) {
      throw new BadRequestException(
        "Bu productga allaqachon comment yozgansiz",
      );
    }

    const comment = this.commentRepo.create({
      text: dto.text,
      rating: dto.rating,
      images: dto.images,
      user,
      product,
    });

    return this.commentRepo.save(comment);
  }

  async findByProduct(productId: number) {
    return this.commentRepo.find({
      where: { product: { id: productId } },
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
  }
}
