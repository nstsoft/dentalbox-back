import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ValidateBody<T>(classType: new (...args: any[]) => T): MethodDecorator {
  return function (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        // Transform and validate the body against the given DTO class
        const instance = plainToClass(classType, req.body);
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
