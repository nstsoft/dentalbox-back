import { getAllProducts, getProductById } from '@useCases';
import { BaseController, Controller, Get } from '@utils';
import { Request } from 'express';

@Controller('/product')
export class ProductController extends BaseController {
  @Get('/:id')
  async get(req: Request) {
    return getProductById(req.params.id);
  }

  @Get('/')
  async getAll() {
    return getAllProducts();
  }
}
