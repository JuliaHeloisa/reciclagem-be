import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecyclingItem } from './entities/recycling-item.entity';
import { RecyclingItemService } from './recycling-item.service';
import { RecyclingItemController } from './recycling-item.controller';
import { AuthModule } from 'src/auth/auth.module';
import { RecyclingLocation } from 'src/recycling-location/entities/recycling-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecyclingItem, RecyclingLocation]),
    AuthModule,
  ],
  providers: [RecyclingItemService],
  controllers: [RecyclingItemController],
})
export class RecyclingItemModule {}
