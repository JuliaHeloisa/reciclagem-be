import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../users/entities/user.entity';

export const Role = (role: UserRole) => SetMetadata('role', role);
