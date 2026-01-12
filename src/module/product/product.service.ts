import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find({
      where: { isActive: true },
      order: { createdAt: "DESC" },
    });
  }

  findOne(id: number) {
    return this.productRepo.findOneBy({ id });
  }

  update(id: number, dto: UpdateProductDto) {
    return this.productRepo.update(id, dto);
  }

  remove(id: number) {
    return this.productRepo.update(id, { isActive: false });
  }

  // jsonb ichidan filter
  findByAttribute(key: string, value: string) {
    return this.productRepo
      .createQueryBuilder("product")
      .where(`product.attributes ->> :key = :value`, { key, value })
      .getMany();
  }
}

