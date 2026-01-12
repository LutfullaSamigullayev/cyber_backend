import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";

import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/constants/role";
import { Public } from "src/common/decorators/public.decorator";

@ApiTags("Products")
@Controller("products")
export class ProductController {
  constructor(private readonly service: ProductService) {}

  // ================= CREATE =================
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Mahsulot yaratish",
    description: "⚠️ Faqat ADMIN uchun",
  })
  @ApiResponse({ status: 201, description: "Mahsulot yaratildi" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden (Admin emas)" })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  // ================= GET ALL =================
  @ApiOperation({
    summary: "Barcha mahsulotlar",
    description: "Public endpoint",
  })
  @ApiResponse({ status: 200, description: "Mahsulotlar ro‘yxati" })
  @Public()
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ================= GET ONE =================
  @ApiOperation({
    summary: "Bitta mahsulotni olish",
  })
  @ApiParam({
    name: "id",
    example: 1,
    description: "Mahsulot ID",
  })
  @ApiResponse({ status: 200, description: "Mahsulot topildi" })
  @ApiResponse({ status: 404, description: "Mahsulot topilmadi" })
  @Public()
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // ================= UPDATE =================
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Mahsulotni yangilash",
    description: "⚠️ Faqat ADMIN uchun",
  })
  @ApiParam({
    name: "id",
    example: 1,
    description: "Mahsulot ID",
  })
  @ApiResponse({ status: 200, description: "Mahsulot yangilandi" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.service.update(id, dto);
  }

  // ================= DELETE =================
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({
    summary: "Mahsulotni o‘chirish",
    description: "⚠️ Faqat ADMIN uchun",
  })
  @ApiParam({
    name: "id",
    example: 1,
    description: "Mahsulot ID",
  })
  @ApiResponse({ status: 200, description: "Mahsulot o‘chirildi" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
