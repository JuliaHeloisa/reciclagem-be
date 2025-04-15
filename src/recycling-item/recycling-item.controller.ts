import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { RecyclingItemService } from './recycling-item.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRecyclingItemDto } from './dto/create-recycling-item.dto';
import { User, UserRole } from '../users/entities/user.entity'; // Importe sua entidade User
import { Role } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('recycling-items')
export class RecyclingItemController {
  constructor(private readonly recyclingItemService: RecyclingItemService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async registerItem(
    @Request() req: { user: User },
    @Body() createDto: CreateRecyclingItemDto,
  ) {
    return this.recyclingItemService.registerItem(req.user, createDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserItems(@Request() req: { user: User }) {
    return this.recyclingItemService.getUserItems(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.recyclingItemService.delete(id);
    return { message: 'RecyclingItem deletado com sucesso' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(UserRole.OWNER)
  @Get('/owner/items')
  getItemsByOwner(@Request() req: { user: User }) {
    return this.recyclingItemService.getItemsByOwner(req.user);
  }

  @Get('ranking')
  @UseGuards(JwtAuthGuard)
  getRanking() {
    return this.recyclingItemService.getUserRanking();
  }
  @Get('/common/items')
  @UseGuards(JwtAuthGuard)
  @Role(UserRole.COMMON)
  getItemsByUser(@Request() req: { user: User }) {
    return this.recyclingItemService.getItemsByUser(req.user);
  }
}
