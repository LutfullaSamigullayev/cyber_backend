import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
w
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "USER" })
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}
