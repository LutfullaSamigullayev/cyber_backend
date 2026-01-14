import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { ShippingService } from "./shipping.service";
import { CreateShippingMethodDto } from "./dto/create-shipping-method.dto";
import { UpdateShippingMethodDto } from "./dto/update-shipping-method.dto";
import { ShippingMethod } from "./entities/shipping-method.entity";

@ApiTags("Shipping")
@Controller("shipping-methods")
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @ApiOperation({ summary: "Create shipping method" })
  @ApiResponse({ status: 201, type: ShippingMethod })
  create(@Body() dto: CreateShippingMethodDto) {
    return this.shippingService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get all active shipping methods" })
  @ApiResponse({ status: 200, type: [ShippingMethod] })
  findAll() {
    return this.shippingService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get shipping method by ID" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, type: ShippingMethod })
  findOne(@Param("id") id: string) {
    return this.shippingService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update shipping method" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, type: ShippingMethod })
  update(@Param("id") id: string, @Body() dto: UpdateShippingMethodDto) {
    return this.shippingService.update(+id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete shipping method" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Shipping method deleted" })
  remove(@Param("id") id: string) {
    return this.shippingService.remove(+id);
  }
}
