import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
  } from "typeorm";
  import { Profile } from "src/module/profile/entities/profile.entity";
  import { OrderItem } from "./order-item.entity";
  
  export enum OrderStatus {
    PENDING = "pending",
    PAID = "paid",
    SHIPPED = "shipped",
    COMPLETED = "completed",
    CANCELED = "canceled",
  }
  
  @Entity("orders")
  export class Order {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Profile, (profile) => profile.orders, {
      onDelete: "CASCADE",
    })
    profile: Profile;
  
    @OneToMany(() => OrderItem, (item) => item.order, {
      cascade: true,
    })
    items: OrderItem[];
  
    @Column({
      type: "enum",
      enum: OrderStatus,
      default: OrderStatus.PENDING,
    })
    status: OrderStatus;
  
    @Column({ type: "decimal", precision: 10, scale: 2 })
    totalPrice: number;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  