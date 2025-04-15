import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MaterialsModule } from './materials/materials.module';
import { RecyclingItemModule } from './recycling-item/recycling-item.module';
import mysql12 from 'mysql2';
import { RecyclingLocationModule } from './recycling-location/recycling-location.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      driver: mysql12,
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'app_db',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
    }),
    UsersModule,
    MaterialsModule,
    RecyclingItemModule,
    RecyclingLocationModule,
  ],
})
export class AppModule {}
