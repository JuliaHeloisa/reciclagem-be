// src/recycling-item/entities/recycling-item.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RecyclingLocation } from '../../recycling-location/entities/recycling-location.entity';

@Entity()
export class RecyclingItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.recyclingItems)
  user: User;

  @ManyToOne(() => RecyclingLocation, { eager: true })
  @JoinColumn({ name: 'locationId' })
  location: RecyclingLocation;

  @Column()
  material: string;

  @Column()
  quantity: number;

  @Column()
  date: Date;
}
