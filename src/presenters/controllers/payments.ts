import { SubscriptionError } from '@errors';
import { createSetupIntent, getClientSecret, getSubscriptionByWorkspace } from '@useCases';
import { BaseController, Controller, Get, RolesGuard } from '@utils';

import { authenticate } from '../middlewares';

@Controller('/payment', [authenticate(false, true)])
export class PaymentController extends BaseController {
  @RolesGuard('owner')
  @Get('/create-payment-intent')
  async my(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    return createSetupIntent(req.user.stripeCustomerId!);
  }

  @RolesGuard('owner')
  @Get('/client-secret')
  async getClientSecret(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    const subscription = await getSubscriptionByWorkspace(req.workspace);
    if (!subscription?.stripeSubscription) {
      throw new SubscriptionError('StripeSubscriptionNotFound', {});
    }
    return getClientSecret(subscription?.stripeSubscription, req.user.stripeCustomerId!);
  }
}
