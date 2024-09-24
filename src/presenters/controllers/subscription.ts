import { SetDefaultPaymentMethod } from '@domains';
import { PaymentError, PaymentNotFoundError } from '@errors';
import {
  getPriceByIdById,
  getProductById,
  getStripeSubscription,
  getSubscriptionByWorkspace,
  retrievePaymentMethods,
  setSubscriptionDefaultPaymentMethod,
} from '@useCases';
import { BaseController, Controller, Get, Patch, RolesGuard, ValidateBody } from '@utils';
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

  @Patch('/payment-method')
  @RolesGuard('owner', 'admin')
  @ValidateBody(SetDefaultPaymentMethod)
  async setDefaultPaymentMethod(
    req: Express.AuthenticatedRequest<unknown, unknown, SetDefaultPaymentMethod>,
  ) {
    const paymentMethod = req.body.payment;
    const methods = await retrievePaymentMethods(req.user.stripeCustomerId!);
    if (!methods.find(({ id }) => id === 'paymentMethod')) {
      throw new PaymentError(PaymentNotFoundError, { message: 'Payment method not found' }, 404);
    }
    const subscription = await getSubscriptionByWorkspace(req.workspace);
    if (!subscription) {
      throw new NotFound('Subscription not found');
    }

    const stripeSubscription = await getStripeSubscription(subscription.stripeSubscription);
    return setSubscriptionDefaultPaymentMethod(stripeSubscription.id, paymentMethod);
  }
}
