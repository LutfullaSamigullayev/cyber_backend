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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from "@nestjs/swagger";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";

@ApiTags("Address")
@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // ➕ Create address
  @Post(":profileId")
  @ApiOperation({ summary: "Profile uchun yangi address qo‘shish" })
  @ApiParam({
    name: "profileId",
    type: Number,
    description: "Profile ID",
  })
  @ApiResponse({ status: 201, description: "Address muvaffaqiyatli yaratildi" })
  @ApiResponse({ status: 404, description: "Profile topilmadi" })
  create(
    @Param("profileId", ParseIntPipe) profileId: number,
    @Body() dto: CreateAddressDto,
  ) {
    return this.addressService.create(profileId, dto);
  }

  // 📥 Get all addresses
  @Get(":profileId")
  @ApiOperation({ summary: "Profile addresslarini olish" })
  @ApiParam({
    name: "profileId",
    type: Number,
    description: "Profile ID",
  })
  @ApiResponse({ status: 200, description: "Addresslar ro‘yxati" })
  findAll(
    @Param("profileId", ParseIntPipe) profileId: number,
  ) {
    return this.addressService.findAll(profileId);
  }

  // ✏️ Update address
  @Patch(":id")
  @ApiOperation({ summary: "Address ma’lumotlarini yangilash" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Address ID",
  })
  @ApiResponse({ status: 200, description: "Address yangilandi" })
  @ApiResponse({ status: 404, description: "Address topilmadi" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, dto);
  }

  // 🗑 Delete address
  @Delete(":id")
  @ApiOperation({ summary: "Addressni o‘chirish" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Address ID",
  })
  @ApiResponse({ status: 200, description: "Address o‘chirildi" })
  @ApiResponse({ status: 404, description: "Address topilmadi" })
  remove(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.addressService.remove(id);
  }
}
