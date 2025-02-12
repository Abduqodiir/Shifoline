import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotAcceptableException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RequestInterface } from './check-auth.guard';
import { Roles } from '@decorators';
import { UserRoles } from '@modules';

@Injectable()
export class CheckRoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<RequestInterface>();
        const roles = this.reflector.get(Roles, context.getHandler());


        if (request.role == UserRoles.user && !roles) {
            return true
        }

        if (!roles || !roles.includes(request.role)) {
            throw new NotAcceptableException(
                "User don't have permission to this endpoint",
            );
        }

        return true;
    }
}