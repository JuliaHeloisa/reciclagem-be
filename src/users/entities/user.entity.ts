import { RecyclingLocation } from 'src/recycling-location/entities/recycling-location.entity';
import { RecyclingItem } from '../../recycling-item/entities/recycling-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum UserRole {
  COMMON = 'common',
  OWNER = 'owner',
}

@Entity('users')
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.COMMON,
  })
  role: UserRole;

  @OneToMany(() => RecyclingItem, (recyclingItem) => recyclingItem.user)
  recyclingItems: RecyclingItem[];

  @OneToMany(() => RecyclingLocation, (location) => location.user)
  recyclingLocations: RecyclingLocation[];
}
