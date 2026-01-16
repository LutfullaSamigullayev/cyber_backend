import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";
import { Profile } from "src/module/profile/entities/profile.entity";
import { Product } from "src/module/product/entities/product.entity";

@Entity("comments")
@Unique(["profile", "product"]) // 1 user = 1 comment per product
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  text: string;

  @Column({ type: "int" })
  rating: number; // 1-5

  @Column({ type: "jsonb", nullable: true })
  images?: string[];

  @ManyToOne(() => Profile, (profile) => profile.comments, {
    onDelete: "CASCADE",
  })
  profile: Profile;

  @ManyToOne(() => Product, {
    onDelete: "CASCADE",
  })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
