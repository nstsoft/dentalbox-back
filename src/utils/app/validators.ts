import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ValidateBody<T>(classType: new (...args: any[]) => T): MethodDecorator {
  return function (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const instance = plainToClass(classType, req.body);
        const errors: ValidationError[] = await validate(instance as object);

        if (errors.length > 0) {
          return res.status(400).json({ errors: errors.map((error) => Object.values(error.constraints || {})).flat() });
        }

        return originalMethod.call(this, req, res, next);
      } catch (error) {
        return next(error);
      }
    };
  };
}
