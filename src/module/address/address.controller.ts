import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // ➕ Create
  @Post(":profileId")
  create(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() dto: CreateAddressDto,
  ) {
    return this.addressService.create(profileId, dto);
  }

  // 📥 Get all
  @Get(":profileId")
  findAll(
    @Param("profileId", ParseIntPipe) profileId: number,
  ) {
    return this.addressService.findAll(profileId);
  }

  // ✏️ Update
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, dto);
  }

  // 🗑 Delete
  @Delete(":id")
  remove(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.addressService.remove(id);
  }
}
