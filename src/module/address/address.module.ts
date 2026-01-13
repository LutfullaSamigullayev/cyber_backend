import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";
import { Address } from "./entities/address.entity";
import { Profile } from "../profile/entities/profile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Address, Profile])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
