import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShippingMethod } from "./entities/shipping-method.entity";
import { CreateShippingMethodDto } from "./dto/create-shipping-method.dto";
import { UpdateShippingMethodDto } from "./dto/update-shipping-method.dto";

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(ShippingMethod)
    private readonly shippingRepo: Repository<ShippingMethod>
  ) {}

  create(dto: CreateShippingMethodDto) {
    const method = this.shippingRepo.create(dto);
    return this.shippingRepo.save(method);
  }

  findAll() {
    return this.shippingRepo.find({
      where: { isActive: true },
      order: { price: "ASC" },
    });
  }

  async findOne(id: number) {
    const method = await this.shippingRepo.findOne({ where: { id } });
    if (!method) throw new NotFoundException("Shipping method not found");
    return method;
  }

  async update(id: number, dto: UpdateShippingMethodDto) {
    await this.findOne(id);
    await this.shippingRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.shippingRepo.delete(id);
  }
}
