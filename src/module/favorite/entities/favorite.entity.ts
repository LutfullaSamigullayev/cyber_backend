import { Product } from "src/module/product/entities/product.entity";
import { Profile } from "src/module/profile/entities/profile.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
  } from "typeorm";
  
  @Entity("favorites")
  export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Profile, (profile) => profile.favorites, {
      onDelete: "CASCADE",
    })
    profile: Profile;
  
    @ManyToMany(() => Product)
    @JoinTable({
      name: "favorite_products",
      joinColumn: { name: "favorite_id" },
      inverseJoinColumn: { name: "product_id" },
    })
    products: Product[];
  
    @CreateDateColumn()
    createdAt: Date;
  }
  