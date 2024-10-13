import { ChairDto, ChairEntity } from '@domains';
import {
  createChair,
  getChairsByCabinet,
  getChairsByWorkspaceId,
  getChairsSummary,
} from '@useCases';
import { BaseController, Controller, Get, Post, RolesGuard, ValidateBody } from '@utils';

import { authenticate, verifySubscription } from '../middlewares';

@Controller('/chair', [authenticate(), verifySubscription()])
export class ChairController extends BaseController {
  @Get('/')
  async list(req: Express.AuthenticatedRequest) {
    return getChairsByWorkspaceId(req.workspace, { skip: req.query.skip, limit: req.query.limit });
  }

  @Get('/summary')
  async summary(req: Express.AuthenticatedRequest) {
    return getChairsSummary(req.workspace);
  }

  @Get('/:cabinet')
  async byCabinet(req: Express.AuthenticatedRequest) {
    return getChairsByCabinet(req.query.cabinet, { skip: req.query.skip, limit: req.query.limit });
  }

  @RolesGuard('admin', 'owner')
  @ValidateBody(ChairDto)
  @Post('/')
  async create(req: Express.AuthenticatedRequest<unknown, ChairEntity, ChairDto>) {
    return createChair({ ...req.body, workspace: req.workspace });
  }
}
