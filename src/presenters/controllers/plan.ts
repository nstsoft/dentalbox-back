import { getAllPlans, getPlanById } from '@useCases';
import { BaseController, Controller, Get } from '@utils';
import { Request } from 'express';

@Controller('/plan')
export class PlanController extends BaseController {
  constructor() {
    super();
  }

  @Get('/:id')
  async get(req: Request) {
    return getPlanById(req.params.id);
  }

  @Get('/')
  async login() {
    return getAllPlans();
  }
}
