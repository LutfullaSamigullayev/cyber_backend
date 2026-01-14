import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ShippingService } from "./shipping.service";
import { CreateShippingMethodDto } from "./dto/create-shipping-method.dto";
import { UpdateShippingMethodDto } from "./dto/update-shipping-method.dto";

@ApiTags("Shipping")
@Controller("shipping-methods")
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  create(@Body() dto: CreateShippingMethodDto) {
    return this.shippingService.create(dto);
  }

  @Get()
  findAll() {
    return this.shippingService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.shippingService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateShippingMethodDto,
  ) {
    return this.shippingService.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.shippingService.remove(+id);
  }
}
