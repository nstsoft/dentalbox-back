import { getAllPlans, getPlanById } from '@useCases';
import { BaseController, Controller, Get } from '@utils';
import { Request } from 'express';

@Controller('/product')
export class ProductController extends BaseController {
  @Get('/:id')
  async get(req: Request) {
    return getPlanById(req.params.id);
  }

  @Get('/')
  async login() {
    return getAllPlans();
  }
}
