// src/auth/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<UserRole>(
      'role',
      context.getHandler(),
    );
    if (!requiredRole) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: { role: UserRole } }>();

    if (!request.user) {
      return false;
    }

    return request.user.role === requiredRole;
  }
}
