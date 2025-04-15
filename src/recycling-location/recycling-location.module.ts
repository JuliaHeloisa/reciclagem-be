import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RecyclingLocation } from './entities/recycling-location.entity';
import { RecyclingLocationController } from './recycling-location.controller';
import { RecyclingLocationService } from './recycling-location.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RecyclingLocation]), AuthModule],
  controllers: [RecyclingLocationController],
  providers: [RecyclingLocationService],
})
export class RecyclingLocationModule {}
