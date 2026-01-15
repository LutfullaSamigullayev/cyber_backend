import { Profile } from "src/module/profile/entities/profile.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItem } from "./cart-item.entity";

export enum CartStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
}

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  // ✅ ANIQ VA TO‘G‘RI
  @ManyToOne(() => Profile, (profile) => profile.carts, {
    onDelete: "CASCADE",
  })
  profile: Profile;

  @Column({
    type: "enum",
    enum: CartStatus,
    default: CartStatus.ACTIVE,
  })
  status: CartStatus;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items: CartItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
