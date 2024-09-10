import { plainToInstance } from 'class-transformer';
import { validate, type ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function ValidateBody<T>(classType: new (...args: any[]) => T): MethodDecorator {
  return function (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const instance = plainToInstance(classType, req.body);

        const errors: ValidationError[] = await validate(instance as object, {
          whitelist: true,
          forbidNonWhitelisted: true,
          forbidUnknownValues: true,
        });

        if (errors.length > 0) {
          const formattedErrors = errors.map((error) => {
            return {
              property: error.property,
              constraints: Object.values(error.constraints || {}),
              children: error.children,
            };
          });

          return res.status(400).json({ errors: formattedErrors });
        }

        return originalMethod.call(this, req, res, next);
      } catch (error) {
        return next(error);
      }
    };
  };
}
