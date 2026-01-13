import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "./entities/profile.entity";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { User } from "../auth/entities/user.entity";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userId: number, dto: CreateProfileDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found");

    const profile = this.profileRepo.create({
      ...dto,
      user,
    });

    return this.profileRepo.save(profile);
  }

  async findMyProfile(userId: number) {
    const profile = await this.profileRepo.findOne({
      where: { user: { id: userId } },
      relations: ["user"],
    });

    if (!profile) throw new NotFoundException("Profile not found");
    return profile;
  }

  async update(userId: number, dto: UpdateProfileDto) {
    const profile = await this.findMyProfile(userId);
    Object.assign(profile, dto);
    return this.profileRepo.save(profile);
  }

  async remove(userId: number) {
    const profile = await this.findMyProfile(userId);
    return this.profileRepo.remove(profile);
  }
}
