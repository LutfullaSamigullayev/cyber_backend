import { Address } from "src/module/address/entities/address.entity";
import { User } from "src/module/auth/entities/user.entity";
import { Cart } from "src/module/cart/entities/cart.entity";
import { Favorite } from "src/module/favorite/entities/favorite.entity";
import { Order } from "src/module/order/entities/order.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => Address, (address) => address.profile)
  addresses: Address[];

  @OneToMany(() => Favorite, (favorite) => favorite.profile)
  favorites: Favorite[];

  @OneToMany(() => Cart, (cart) => cart.profile)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.profile)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
