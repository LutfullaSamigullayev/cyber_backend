import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { User } from "src/module/auth/entities/user.entity";
import { Product } from "src/module/product/entities/product.entity";

@Entity("comments")
@Unique(["user", "product"]) // 1 user = 1 comment per product
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "int" })
  rating: number; // 1-5

  @Column({ type: "jsonb", nullable: true })
  images?: string[];

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Product, {
    onDelete: "CASCADE",
  })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
