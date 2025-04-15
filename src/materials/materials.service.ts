import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './entities/material.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async create(data: Partial<Material>): Promise<Material> {
    const material = this.materialRepository.create(data);
    return this.materialRepository.save(material);
  }

  async findAll(): Promise<Material[]> {
    return this.materialRepository.find();
  }

  async findOne(id: number): Promise<Material> {
    const material = await this.materialRepository.findOne({ where: { id } });
    if (!material) {
      throw new Error(`Material with id ${id} not found`);
    }
    return material;
  }

  async update(id: number, data: Partial<Material>): Promise<Material> {
    await this.materialRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.materialRepository.delete(id);
  }
}
