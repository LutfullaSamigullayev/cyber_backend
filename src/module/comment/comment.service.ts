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
import { Product } from "../product/entities/product.entity";
import { OrderItem } from "../order/entities/order-item.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {}

  async create(dto: CreateCommentDto, profileId: number) {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException("Product topilmadi");
    }

    const ordered = await this.orderItemRepo
      .createQueryBuilder("item")
      .leftJoin("item.order", "order")
      .leftJoin("order.profile", "profile")
      .where("profile.id = :profileId", { profileId })
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
        profile: { id: profileId },
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
      profile: { id: profileId } as any,
      product,
    });

    return this.commentRepo.save(comment);
  }

  async findByProduct(productId: number) {
    return this.commentRepo.find({
      where: { product: { id: productId } },
      relations: ["profile"],
      order: { createdAt: "DESC" },
    });
  }
}
