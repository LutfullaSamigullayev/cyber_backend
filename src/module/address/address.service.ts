import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Address } from "./entities/address.entity";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Profile } from "src/module/profile/entities/profile.entity";

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  // ➕ Create address
  async create(profileId: number, dto: CreateAddressDto) {
    const profile = await this.profileRepo.findOne({
      where: { id: profileId },
    });

    if (!profile) {
      throw new NotFoundException("Profile not found");
    }

    // agar yangi address main bo‘lsa → eskilarini false qilamiz
    if (dto.isMain) {
      await this.addressRepo
        .createQueryBuilder()
        .update(Address)
        .set({ isMain: false })
        .where("profileId = :profileId", { profileId })
        .execute();
    }

    const address = this.addressRepo.create({
      ...dto,
      profile,
    });

    return this.addressRepo.save(address);
  }

  // 📥 Profile addresslari
  findAll(profileId: number) {
    return this.addressRepo.find({
      where: {
        profile: { id: profileId },
      },
      order: { createdAt: "DESC" },
    });
  }

  // ✏️ Update address
  async update(id: number, dto: UpdateAddressDto) {
    const address = await this.addressRepo.findOne({
      where: { id },
      relations: ["profile"],
    });

    if (!address) {
      throw new NotFoundException("Address not found");
    }

    if (dto.isMain) {
      await this.addressRepo
        .createQueryBuilder()
        .update(Address)
        .set({ isMain: false })
        .where("profileId = :profileId", {
          profileId: address.profile.id,
        })
        .execute();
    }

    Object.assign(address, dto);
    return this.addressRepo.save(address);
  }

  // 🗑 Delete address
  async remove(id: number) {
    const address = await this.addressRepo.findOne({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException("Address not found");
    }

    return this.addressRepo.remove(address);
  }
}
