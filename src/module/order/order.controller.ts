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
   ApiTags,
   ApiBearerAuth,
   ApiOperation,
   ApiResponse,
   ApiParam,
 } from "@nestjs/swagger";
 import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Profile } from "src/module/profile/entities/profile.entity";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Buyurtma yaratish" })
  @ApiResponse({ status: 201, description: "Buyurtma yaratildi" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @Post()
  create(
    @CurrentUser("profile") profile: Profile,
    @Body() dto: CreateOrderDto
  ) {
    return this.orderService.create(profile, dto);
  }

  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Mening buyurtmalarim" })
  @ApiResponse({ status: 200, description: "Buyurtmalar ro‘yxati" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @Get("me")
  findMyOrders(@CurrentUser("profile.id") profileId: number) {
    return this.orderService.findMyOrders(profileId);
  }

  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Bitta buyurtmani olish" })
  @ApiParam({
    name: "id",
    example: 1,
    description: "Buyurtma ID",
  })
  @ApiResponse({ status: 200, description: "Buyurtma topildi" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser("profile.id") profileId: number
  ) {
    return this.orderService.findOne(id, profileId);
  }
}
