import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecyclingLocation } from './entities/recycling-location.entity';
import { CreateRecyclingLocationDto } from './dto/create-recycling-location.dto';
import { UpdateRecyclingLocationDto } from './dto/update-recycling-location.dto';
import axios from 'axios';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RecyclingLocationService {
  constructor(
    @InjectRepository(RecyclingLocation)
    private readonly recyclingLocationRepository: Repository<RecyclingLocation>,
  ) {}

  async create(
    dto: CreateRecyclingLocationDto,
    user: User,
  ): Promise<RecyclingLocation> {
    let latitude = dto.latitude;
    let longitude = dto.longitude;

    if (latitude === undefined || longitude === undefined) {
      const geo = await this.getLatitudeLongitudeByAddress(dto.address);
      latitude = geo.latitude;
      longitude = geo.longitude;
    }

    const location = this.recyclingLocationRepository.create({
      ...dto,
      latitude,
      longitude,
      user,
    });

    return await this.recyclingLocationRepository.save(location);
  }

  async findAll(): Promise<RecyclingLocation[]> {
    return this.recyclingLocationRepository.find();
  }

  async findAllByUser(user: User): Promise<RecyclingLocation[]> {
    return this.recyclingLocationRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: string): Promise<RecyclingLocation> {
    const location = await this.recyclingLocationRepository.findOne({
      where: { id },
    });
    if (!location) {
      throw new NotFoundException('Local de reciclagem não encontrado');
    }
    return location;
  }

  async getLocationsByUser(user: User): Promise<RecyclingLocation[]> {
    return this.recyclingLocationRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async update(
    id: string,
    updateDto: UpdateRecyclingLocationDto,
  ): Promise<RecyclingLocation> {
    await this.findOne(id); // Verifica se existe
    await this.recyclingLocationRepository.update(id, updateDto);
    return this.findOne(id); // Retorna o atualizado
  }

  async delete(id: string, user: User): Promise<void> {
    const location = await this.recyclingLocationRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!location) {
      throw new NotFoundException('Local não encontrado.');
    }

    if (location.user.id !== user.id) {
      throw new ForbiddenException(
        'Você não tem permissão para excluir este local.',
      );
    }

    await this.recyclingLocationRepository.delete(id);
  }

  async getLatitudeLongitudeByAddress(
    address: string,
  ): Promise<{ latitude: number; longitude: number }> {
    try {
      const encodedAddress = encodeURIComponent(address);

      const response = await axios.get<Array<{ lat: string; lon: string }>>(
        `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'ReciclaMais/1.0',
            // obrigatório para Nominatim
          },
        },
      );

      if (!response.data || response.data.length === 0) {
        throw new Error('Endereço não encontrado');
      }

      const location = (
        response.data as Array<{ lat: string; lon: string }>
      )[0];
      return {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      };
    } catch (error) {
      console.error('Erro ao buscar latitude e longitude:', error);
      throw new Error('Não foi possível obter a latitude e longitude');
    }
  }
}
