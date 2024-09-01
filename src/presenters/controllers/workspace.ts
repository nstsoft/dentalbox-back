import { getUserWorkspaces } from '@useCases';
import { BaseController, Controller, Get } from '@utils';

import { authenticate } from '../middlewares';

@Controller('/workspace')
export class WorkspaceController extends BaseController {
  @Get('/', [authenticate(false, false)])
  async me(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    return getUserWorkspaces(req.user.workspaces);
  }
}
