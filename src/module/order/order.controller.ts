import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Profile } from "src/module/profile/entities/profile.entity";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @CurrentUser("profile") profile: Profile,
    @Body() dto: CreateOrderDto
  ) {
    return this.orderService.create(profile, dto);
  }

  @Get("me")
  findMyOrders(@CurrentUser("profile.id") profileId: number) {
    return this.orderService.findMyOrders(profileId);
  }

  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser("profile.id") profileId: number
  ) {
    return this.orderService.findOne(id, profileId);
  }
}
