import { BaseController, Controller, Get } from '@utils';

@Controller('/user')
export class UserController extends BaseController {
  constructor() {
    super();
  }

  @Get('/')
  async get() {
    console.log('Hello World!');
    return 'body';
  }
}
