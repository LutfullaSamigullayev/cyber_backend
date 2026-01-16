import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "../auth/entities/user.entity";

@ApiTags("Comments")
@ApiBearerAuth()
@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // ➕ Create comment (ONLY IF ORDERED)
  @Post()
  @ApiOperation({
    summary: "Productga comment qoldirish (faqat sotib olgan bo‘lsa)",
  })
  create(
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: User,
  ) {
    return this.commentService.create(dto, user);
  }

  // 📄 Get product comments
  @Get("product/:productId")
  @ApiOperation({ summary: "Product commentlari" })
  findByProduct(
    @Param("productId", ParseIntPipe) productId: number,
  ) {
    return this.commentService.findByProduct(productId);
  }
}
