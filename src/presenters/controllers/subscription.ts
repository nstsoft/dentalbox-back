import { Subscription } from '@domains';
import { SubscriptionError, SubscriptionNotFound } from '@errors';
import {
  getPriceByIdById,
  getProductById,
  getStripeSubscription,
  getSubscriptionByWorkspace,
  reactivateSubscription,
} from '@useCases';
import { BaseController, Controller, Get, RolesGuard } from '@utils';
import { NotFound } from 'http-errors';

import { authenticate } from '../middlewares';

@Controller('/subscription', [authenticate(false, true)])
export class SubscriptionController extends BaseController {
  @Get('/')
  async my(req: Express.AuthenticatedRequest) {
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
      defaultPaymentMethod: stripeSubscription.default_payment_method,
      billing_cycle_anchor: stripeSubscription.billing_cycle_anchor,
      cancel_at: stripeSubscription.cancel_at,
      canceled_at: stripeSubscription.canceled_at,
      cancellation_details: stripeSubscription.cancellation_details,
      created: stripeSubscription.created,
      currency: stripeSubscription.currency,
      current_period_end: stripeSubscription.current_period_end,
      current_period_start: stripeSubscription.current_period_start,
      customer: stripeSubscription.customer,
      id: stripeSubscription.id,
      status: stripeSubscription.status,
      price,
      product,
    };
  }

  @Get('/reactivate', [authenticate(true, true)])
  @RolesGuard('owner', 'admin')
  async createNew(req: Express.AuthenticatedRequest) {
    const previousSubscription = await getSubscriptionByWorkspace(req.workspace);
    if (!previousSubscription) {
      throw new SubscriptionError(SubscriptionNotFound, { message: 'Subscription not found' }, 404);
    }

    return reactivateSubscription(new Subscription(previousSubscription));
  }
}
