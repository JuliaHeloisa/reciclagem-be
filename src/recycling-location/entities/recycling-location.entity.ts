// src/recycling-location/entities/recycling-location.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { RecyclingItem } from '../../recycling-item/entities/recycling-item.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class RecyclingLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  materialsAccepted: string;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  openingHours: string;

  @Column('double', { nullable: true })
  latitude: number;

  @Column('double', { nullable: true })
  longitude: number;

  @OneToMany(() => RecyclingItem, (item) => item.location)
  items: RecyclingItem[];

  @ManyToOne(() => User, (user) => user.recyclingLocations)
  user: User;
}
