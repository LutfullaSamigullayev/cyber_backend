import { Profile } from "src/module/profile/entities/profile.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column({ nullable: true })
  home: string;

  @Column({ default: false })
  isMain: boolean;

  @ManyToOne(() => Profile, (profile) => profile.addresses, {
    onDelete: "CASCADE",
  })
  profile: Profile;

  @CreateDateColumn()
  createdAt: Date;
}
