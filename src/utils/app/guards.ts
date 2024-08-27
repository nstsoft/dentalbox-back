/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError } from '@errors';
import { NextFunction, Response } from 'express';

const ROLES_KEY = 'roles';

export function RolesGuard(...roles: string[]) {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(ROLES_KEY, roles, target, propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Express.AuthenticatedRequest, res: Response, next: NextFunction) {
      const workspaceId = req.headers.workspace as string;
      if (!workspaceId || !req.user) return next(new AuthError('Forbidden', { message: 'Invalid role' }));

      const workspaceRoles: string[] = req.user.roles
        .filter(({ workspace }) => workspace === workspaceId)
        .map(({ role }) => role);
      if (res.headersSent) return;

      if (roles.some((item) => workspaceRoles.includes(item))) {
        return originalMethod.call(this, req, res, next);
      }

      return next(new AuthError('Forbidden', { message: 'Invalid role' }));
    };
  };
}
