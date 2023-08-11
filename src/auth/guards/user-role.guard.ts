import { CanActivate, ExecutionContext, Injectable,ForbiddenException } from '@nestjs/common';
import {Reflector} from '@nestjs/core'
import { Observable } from 'rxjs';
import { ValidRoles } from '../interfaces/valid-roles.interface';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector:Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: ValidRoles[] = this.reflector.get(META_ROLES, context.getHandler());
    if(validRoles.length === 0) return true;
    const req = context.switchToHttp().getRequest();
    const user:User = req.user;
    const isAuthorized = validRoles.includes(user.rol as ValidRoles)
    if(isAuthorized) return isAuthorized;
    throw new ForbiddenException();
  }
}
