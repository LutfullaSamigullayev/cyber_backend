import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UseGuards } from "@nestjs/common";
import { ProfileOwnerGuard } from "src/common/guards/profile-owner.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/constants/role";

@ApiTags("Profile")
@ApiBearerAuth()
@UseGuards(RolesGuard, ProfileOwnerGuard)
@Roles(UserRole.ADMIN, UserRole.USER)
@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post(":userId")
  @ApiOperation({ summary: "Create profile by userId" })
  @ApiParam({ name: "userId", example: 1 })
  @ApiResponse({ status: 201, description: "Profile successfully created" })
  create(@Param("userId") userId: number, @Body() dto: CreateProfileDto) {
    return this.profileService.create(userId, dto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get profile by id" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Profile returned" })
  @ApiResponse({ status: 404, description: "Profile not found" })
  findOne(@Param("id") id: number) {
    return this.profileService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update profile by id" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Profile successfully updated" })
  @ApiResponse({ status: 404, description: "Profile not found" })
  update(@Param("id") id: number, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete profile by id" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Profile successfully deleted" })
  @ApiResponse({ status: 404, description: "Profile not found" })
  remove(@Param("id") id: number) {
    return this.profileService.remove(id);
  }
}
