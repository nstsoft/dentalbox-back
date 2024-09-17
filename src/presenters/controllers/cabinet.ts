import { getCabinetsByWorkspaceId } from '@useCases';
import { BaseController, Controller, Get } from '@utils';

import { authenticate } from '../middlewares';

@Controller('/cabinet')
export class CabinetController extends BaseController {
  @Get('/', [authenticate(true, true)])
  async my(req: Express.AuthenticatedRequest) {
    return getCabinetsByWorkspaceId(req.workspace, { skip: req.query.skip, limit: req.query.limit });
  }
}
