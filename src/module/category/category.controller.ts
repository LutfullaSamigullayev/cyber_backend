import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { AuthGuard } from "src/common/guards/auth-guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/constants/role";

@ApiTags("Category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // ================= CREATE =================
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Kategoriya yaratish",
    description: "⚠️ Faqat ADMIN uchun",
  })
  @ApiResponse({ status: 201, description: "Kategoriya yaratildi" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden (Admin emas)" })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  // ================= GET ALL =================
  @ApiOperation({
    summary: "Barcha kategoriyalar",
    description: "Public endpoint",
  })
  @ApiResponse({ status: 200, description: "Kategoriya ro‘yxati" })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  // ================= GET ONE =================
  @ApiOperation({
    summary: "Bitta kategoriyani olish",
  })
  @ApiParam({
    name: "id",
    example: 1,
    description: "Kategoriya ID",
  })
  @ApiResponse({ status: 200, description: "Kategoriya topildi" })
  @ApiResponse({ status: 404, description: "Kategoriya topilmadi" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  // ================= UPDATE =================
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Kategoriya yangilash",
    description: "⚠️ Faqat ADMIN uchun",
  })
  @ApiParam({
    name: "id",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Kategoriya yangilandi" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  // ================= DELETE =================
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Kategoriya o‘chirish",
    description: "⚠️ Faqat ADMIN uchun",
  })
  @ApiParam({
    name: "id",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Kategoriya o‘chirildi" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
