import { Request } from 'express';
import { UserRole } from '../users/entities/user.entity';

export interface RequestWithUser extends Request {
  user?: {
    id: number;
    email: string;
    role: UserRole;
    iat?: number;
    exp?: number;
  };
}
