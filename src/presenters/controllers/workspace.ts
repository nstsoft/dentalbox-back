import { getUserWorkspaces } from '@useCases';
import { BaseController, Controller, Get } from '@utils';

import { authenticate } from '../middlewares';

@Controller('/workspace')
export class WorkspaceController extends BaseController {
  @Get('/', [authenticate(false, false)])
  async my(req: Express.AuthenticatedRequest) {
    return getUserWorkspaces(req.user.workspaces);
  }
}
