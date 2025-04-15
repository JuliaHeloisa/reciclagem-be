import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecyclingItem } from './entities/recycling-item.entity';
import { User } from '../users/entities/user.entity';
import { CreateRecyclingItemDto } from './dto/create-recycling-item.dto';
import { RecyclingLocation } from '../recycling-location/entities/recycling-location.entity';

@Injectable()
export class RecyclingItemService {
  constructor(
    @InjectRepository(RecyclingItem)
    private readonly recyclingItemRepository: Repository<RecyclingItem>,

    @InjectRepository(RecyclingLocation)
    private readonly recyclingLocationRepository: Repository<RecyclingLocation>,
  ) {}
  async registerItem(
    user: User,
    createDto: CreateRecyclingItemDto,
  ): Promise<RecyclingItem> {
    const location = await this.recyclingLocationRepository.findOne({
      where: { id: createDto.locationId },
    });

    if (!location) {
      throw new NotFoundException('Local de reciclagem não encontrado');
    }

    const item = this.recyclingItemRepository.create({
      material: createDto.material,
      quantity: createDto.quantity,
      date: createDto.date,
      user,
      location,
    });

    return this.recyclingItemRepository.save(item);
  }

  async getUserItems(user: User): Promise<RecyclingItem[]> {
    return this.recyclingItemRepository.find({
      where: { user: { id: user.id } },
      relations: ['user', 'location'], // ✅ inclui o local nas respostas
    });
  }

  async getItemsByOwner(user: User): Promise<RecyclingItem[]> {
    return this.recyclingItemRepository.find({
      where: {
        location: {
          user: { id: user.id },
        },
      },
      relations: ['location', 'user'],
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.recyclingItemRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`RecyclingItem com ID ${id} não encontrado.`);
    }
  }

  async getUserRanking(): Promise<any[]> {
    return this.recyclingItemRepository
      .createQueryBuilder('item')
      .select('item.userId', 'userId')
      .addSelect('SUM(item.quantity)', 'total')
      .groupBy('item.userId')
      .orderBy('total', 'DESC')
      .leftJoin('item.user', 'user')
      .addSelect('user.email', 'email')
      .addSelect('user.name', 'name')
      .getRawMany();
  }
  async getItemsByUser(user: User): Promise<RecyclingItem[]> {
    return this.recyclingItemRepository.find({
      where: { user: { id: user.id } },
      relations: ['location'],
      order: { date: 'DESC' },
    });
  }
}
