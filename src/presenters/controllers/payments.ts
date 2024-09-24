import { SetDefaultPaymentMethod } from '@domains';
import { PaymentError, PaymentNotFoundError, SubscriptionError } from '@errors';
import {
  createSetupIntent,
  getClientSecret,
  getStripeSubscription,
  getSubscriptionByWorkspace,
  retrievePaymentMethods,
  setSubscriptionDefaultPaymentMethod,
} from '@useCases';
import { BaseController, Controller, Get, Patch, RolesGuard, ValidateBody } from '@utils';
import { NotFound } from 'http-errors';

import { authenticate } from '../middlewares';

@Controller('/payment')
export class PaymentController extends BaseController {
  @RolesGuard('owner')
  @Get('/create-payment-intent', [authenticate(false, true)])
  async my(req: Express.AuthenticatedRequest) {
    return createSetupIntent(req.user.stripeCustomerId!);
  }

  @RolesGuard('owner', 'admin')
  @Get('/client-secret', [authenticate(false, true)])
  async getClientSecret(req: Express.AuthenticatedRequest) {
    const subscription = await getSubscriptionByWorkspace(req.workspace);
    if (!subscription?.stripeSubscription) {
      throw new SubscriptionError('StripeSubscriptionNotFound', {});
    }
    return getClientSecret(subscription?.stripeSubscription, req.user.stripeCustomerId!);
  }

  @RolesGuard('owner', 'admin')
  @Get('/payment-methods', [authenticate(false, false)])
  async getPaymentMethods(req: Express.AuthenticatedRequest) {
    if (!req.user.stripeCustomerId) {
      throw new Error('StripeCustomerIdNotFound');
    }

    return retrievePaymentMethods(req.user.stripeCustomerId);
  }

  @Patch('/default')
  @RolesGuard('owner', 'admin')
  @ValidateBody(SetDefaultPaymentMethod)
  async setDefaultPaymentMethod(
    req: Express.AuthenticatedRequest<unknown, unknown, SetDefaultPaymentMethod>,
  ) {
    const paymentMethod = req.body.payment;
    const methods = await retrievePaymentMethods(req.user.stripeCustomerId!);
    if (!methods.find(({ id }) => id === paymentMethod)) {
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
