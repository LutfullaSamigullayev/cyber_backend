import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "src/module/profile/entities/profile.entity";
import { Reflector } from "@nestjs/core";

@Injectable()
export class ProfileOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // CurrentUser
    const profileId = Number(request.params.id);

    // 1️⃣ ADMIN har doim ruxsat
    if (user.role === "ADMIN") {
      return true;
    }

    // 2️⃣ Profile egasini tekshirish
    const profile = await this.profileRepo.findOne({
      where: { id: profileId },
      relations: ["user"],
    });

    if (!profile) {
      throw new ForbiddenException("Profile not found");
    }

    if (profile.user.id !== user.id) {
      throw new ForbiddenException("Access denied");
    }

    return true;
  }
}
