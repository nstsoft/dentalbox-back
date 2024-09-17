import { getPriceByIdById, getProductById, getStripeSubscription, getSubscriptionByWorkspace } from '@useCases';
import { BaseController, Controller, Get } from '@utils';
import { NotFound } from 'http-errors';

import { authenticate } from '../middlewares';

@Controller('/subscription', [authenticate(false, true)])
export class SubscriptionController extends BaseController {
  @Get('/')
  async my(req: Express.AuthenticatedRequest<{ workspace: string }>) {
    const subscription = await getSubscriptionByWorkspace(req.workspace);
    if (!subscription) {
      throw new NotFound('Subscription not found');
    }
    const [stripeSubscription, price, product] = await Promise.all([
      getStripeSubscription(subscription?.stripeSubscription),
      getPriceByIdById(subscription.priceId),
      getProductById(subscription.product),
    ]);

    return {
      ...subscription,
      billing_cycle_anchor: stripeSubscription?.billing_cycle_anchor,
      cancel_at: stripeSubscription?.cancel_at,
      canceled_at: stripeSubscription?.canceled_at,
      cancellation_details: stripeSubscription?.cancellation_details,
      created: stripeSubscription?.created,
      currency: stripeSubscription?.currency,
      current_period_end: stripeSubscription?.created,
      current_period_start: stripeSubscription?.created,
      customer: stripeSubscription?.created,
      id: stripeSubscription?.created,
      price,
      product,
    };
  }
}
