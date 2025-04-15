import { UserRole } from '../users/entities/user.entity';

export interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
