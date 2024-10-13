import {
  CantDeleteDefaultPaymentMethod,
  PaymentError,
  PaymentNotFoundError,
  SubscriptionError,
  SubscriptionNotFound,
} from '@errors';
import {
  createSetupIntent,
  deletePaymentMethod,
  geSubscriptionDefaultPaymentMethod,
  getClientSecret,
  getStripeSubscription,
  getSubscriptionByWorkspace,
  retrievePaymentMethods,
  setSubscriptionDefaultPaymentMethod,
} from '@useCases';
import { BaseController, Controller, Delete, Get, Patch, RolesGuard } from '@utils';

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

  @Patch('/:payment', [authenticate()])
  @RolesGuard('owner', 'admin')
  async setDefaultPaymentMethod(req: Express.AuthenticatedRequest<{ payment: string }>) {
    const paymentMethod = req.params.payment;
    const methods = await retrievePaymentMethods(req.user.stripeCustomerId!);
    if (!methods.find(({ id }) => id === paymentMethod)) {
      throw new PaymentError(PaymentNotFoundError, { message: 'Payment method not found' }, 404);
    }
    const subscription = await getSubscriptionByWorkspace(req.workspace);
    if (!subscription) {
      throw new SubscriptionError(SubscriptionNotFound, { message: 'Subscription not found' });
    }

    const stripeSubscription = await getStripeSubscription(subscription.stripeSubscription);
    return setSubscriptionDefaultPaymentMethod(stripeSubscription.id, paymentMethod);
  }

  @Delete('/:payment', [authenticate()])
  @RolesGuard('owner', 'admin')
  async deletePaymentMethod(req: Express.AuthenticatedRequest<{ payment: string }>) {
    const paymentMethod = req.params.payment;
    const methods = await retrievePaymentMethods(req.user.stripeCustomerId!);
    if (!methods.find(({ id }) => id === paymentMethod)) {
      throw new PaymentError(PaymentNotFoundError, { message: 'Payment method not found' }, 404);
    }

    const subscription = await getSubscriptionByWorkspace(req.workspace);
    if (!subscription) {
      throw new SubscriptionError(SubscriptionNotFound, { message: 'Subscription not found' });
    }
    const defaultPayment = await geSubscriptionDefaultPaymentMethod(
      subscription.stripeSubscription,
    );
    if (paymentMethod === defaultPayment) {
      throw new PaymentError(CantDeleteDefaultPaymentMethod, {
        message: 'You can not delete the default payment method',
      });
    }

    return deletePaymentMethod(paymentMethod);
  }
}
