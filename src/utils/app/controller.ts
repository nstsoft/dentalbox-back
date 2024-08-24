import express, { NextFunction, Request, Response, Router } from 'express';
type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete';

type RouteMiddleWare = (req: Request, res: Response, next: NextFunction) => Promise<unknown> | void;

type RouterData = {
  route: string;
  method: Methods;
  routeMiddlewares: RouteMiddleWare[];
  preBuildMiddlewares: RouteMiddleWare[];
};

export function Controller(routePrefix: string, middlewares?: RouteMiddleWare[]): ClassDecorator {
  const controllerMiddlewares = Array.isArray(middlewares) ? middlewares : [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  return function (target: Function) {
    // Using `Function` type for class constructor
    Reflect.defineMetadata('routePrefix', { routePrefix, controllerMiddlewares }, target);
  };
}

export function BaseMethod(
  route: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares: RouteMiddleWare[] = [],
): MethodDecorator {
  const routeMiddlewares = Array.isArray(middlewares) ? middlewares : [];
  return function (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('route', { route, method, routeMiddlewares, preBuildMiddlewares }, target, propertyKey);
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const result = await originalMethod.call(this, req, res, next);
        if (!res.headersSent) {
          console.log('----------------------');
          return res.json(result);
        }
      } catch (error) {
        console.log('ddddddddddddaagggggggg');
        return next(error);
      }
    };
  };
}

// HTTP Method Decorators
export function Get(
  route: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares?: RouteMiddleWare[],
): MethodDecorator {
  return BaseMethod(route, 'get', middlewares, preBuildMiddlewares);
}

export function Post(
  route: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares?: RouteMiddleWare[],
): MethodDecorator {
  return BaseMethod(route, 'post', middlewares, preBuildMiddlewares);
}

export function Put(
  route: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares?: RouteMiddleWare[],
): MethodDecorator {
  return BaseMethod(route, 'put', middlewares, preBuildMiddlewares);
}

export function Patch(
  route: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares?: RouteMiddleWare[],
): MethodDecorator {
  return BaseMethod(route, 'patch', middlewares, preBuildMiddlewares);
}

export function Delete(
  route: string,
  middlewares?: RouteMiddleWare[],
  preBuildMiddlewares?: RouteMiddleWare[],
): MethodDecorator {
  return BaseMethod(route, 'delete', middlewares, preBuildMiddlewares);
}

export abstract class BaseController {
  private readonly router: Router = express.Router();

  constructor() {
    const { routePrefix, controllerMiddlewares } = Reflect.getMetadata('routePrefix', this.constructor) as {
      routePrefix: string;
      controllerMiddlewares: RouteMiddleWare[];
    };

    const prototype = Object.getPrototypeOf(this);

    Object.getOwnPropertyNames(prototype).forEach((methodName: string) => {
      const routeData: RouterData = Reflect.getMetadata('route', prototype, methodName);

      if (routeData) {
        const { route, method, routeMiddlewares, preBuildMiddlewares } = routeData;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handler = (this as any)[methodName].bind(this);

        // Combine middlewares: preBuildMiddlewares -> controllerMiddlewares -> routeMiddlewares
        const combinedMiddlewares = [...preBuildMiddlewares, ...controllerMiddlewares, ...routeMiddlewares];

        this.router[method](`${routePrefix}${route}`, ...combinedMiddlewares, handler);
      }
    });
  }

  get route() {
    return this.router;
  }
}
