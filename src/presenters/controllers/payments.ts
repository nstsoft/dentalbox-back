import { SubscriptionError } from '@errors';
import { createSetupIntent, getClientSecret, getSubscriptionByWorkspace, retrievePaymentMethods } from '@useCases';
import { BaseController, Controller, Get, RolesGuard } from '@utils';

import { authenticate } from '../middlewares';

@Controller('/payment')
export class PaymentController extends BaseController {
  @RolesGuard('owner')
  @Get('/create-payment-intent', [authenticate(false, true)])
  async my(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    return createSetupIntent(req.user.stripeCustomerId!);
  }

  @RolesGuard('owner', 'admin')
  @Get('/client-secret', [authenticate(false, true)])
  async getClientSecret(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    const subscription = await getSubscriptionByWorkspace(req.workspace);
    if (!subscription?.stripeSubscription) {
      throw new SubscriptionError('StripeSubscriptionNotFound', {});
    }
    return getClientSecret(subscription?.stripeSubscription, req.user.stripeCustomerId!);
  }

  // @RolesGuard('owner')
  @Get('/payment-methods', [authenticate(false, false)])
  async getPaymentMethods(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    if (!req.user.stripeCustomerId) {
      throw new Error('StripeCustomerIdNotFound');
    }
    return retrievePaymentMethods(req.user.stripeCustomerId);
  }
}
