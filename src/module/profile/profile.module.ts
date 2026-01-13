import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";
import { User } from "../auth/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
