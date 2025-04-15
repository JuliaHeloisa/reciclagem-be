import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from './request-user.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Token não encontrado');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException(`Token inválido ou expirado: ${error}`);
    }
  }
}
