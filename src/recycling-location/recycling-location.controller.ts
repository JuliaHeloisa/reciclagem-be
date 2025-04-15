import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RecyclingLocationService } from './recycling-location.service';
import { CreateRecyclingLocationDto } from './dto/create-recycling-location.dto';
import { UpdateRecyclingLocationDto } from './dto/update-recycling-location.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/roles.decorator';
import { User, UserRole } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('recycling-locations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RecyclingLocationController {
  constructor(
    private readonly recyclingLocationService: RecyclingLocationService,
  ) {}

  @Post()
  @Role(UserRole.OWNER)
  create(
    @Body() createDto: CreateRecyclingLocationDto,
    @Request() req: { user: User },
  ) {
    return this.recyclingLocationService.create(createDto, req.user);
  }

  @Get()
  findAll() {
    return this.recyclingLocationService.findAll();
  }

  @Get('my-locations')
  @Role(UserRole.OWNER)
  findAllByUser(@Request() req: { user: User }) {
    return this.recyclingLocationService.findAllByUser(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recyclingLocationService.findOne(id);
  }

  @Put(':id')
  @Role(UserRole.OWNER)
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateRecyclingLocationDto,
  ) {
    return this.recyclingLocationService.update(id, updateDto);
  }

  @Delete(':id')
  @Role(UserRole.OWNER)
  delete(@Param('id') id: string, @Request() req: { user: User }) {
    return this.recyclingLocationService.delete(id, req.user);
  }
}
