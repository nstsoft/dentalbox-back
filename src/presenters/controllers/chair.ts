import { getChairsByCabinet, getChairsByWorkspaceId } from '@useCases';
import { BaseController, Controller, Get } from '@utils';

import { authenticate } from '../middlewares';

@Controller('/chair')
export class ChairController extends BaseController {
  @Get('/', [authenticate(true, true)])
  async list(req: Express.AuthenticatedRequest) {
    return getChairsByWorkspaceId(req.workspace, { skip: req.query.skip, limit: req.query.limit });
  }

  @Get('/:cabinet', [authenticate(true, true)])
  async byCabinet(req: Express.AuthenticatedRequest) {
    return getChairsByCabinet(req.query.cabinet, { skip: req.query.skip, limit: req.query.limit });
  }
}
