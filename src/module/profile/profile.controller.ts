import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { AuthGuard } from "src/common/guards/auth-guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@ApiTags("Profile")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(
    @CurrentUser("id") userId: number,
    @Body() dto: CreateProfileDto,
  ) {
    return this.profileService.create(userId, dto);
  }

  @Get("me")
  findMyProfile(@CurrentUser("id") userId: number) {
    return this.profileService.findMyProfile(userId);
  }

  @Patch()
  update(
    @CurrentUser("id") userId: number,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.update(userId, dto);
  }

  @Delete()
  remove(@CurrentUser("id") userId: number) {
    return this.profileService.remove(userId);
  }
}
