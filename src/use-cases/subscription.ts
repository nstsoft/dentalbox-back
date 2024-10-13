import { subscriptionSource } from '@data';
import { Subscription } from '@domains';
import { stripeProvider } from '@providers';
import { Stripe } from 'stripe';

export const getSubscriptionByWorkspace = (workspace: string) => {
  return subscriptionSource.findOneByWorkspace(workspace);
};

export const setSubscriptionDefaultPaymentMethod = (
  subscription: string,
  default_payment_method: string,
) => {
  return stripeProvider.subscription.update(subscription, { default_payment_method });
};

export const getStripeSubscription = async (id: string) => {
  const stripeSubscription = await stripeProvider.subscription.get(id);

  let type = 'payment-added';
  if (stripeSubscription?.pending_setup_intent?.client_secret) {
    type = 'setup';
  }
  if (stripeSubscription?.latest_invoice?.payment_intent?.client_secret) {
    type = 'payment';
  }

  const clientSecret =
    stripeSubscription?.pending_setup_intent?.client_secret ??
    stripeSubscription?.latest_invoice?.payment_intent?.client_secret;

  return {
    clientSecret,
    ...stripeSubscription,
    type,
  };
};

export const geSubscriptionDefaultPaymentMethod = async (stripeSubscription: string) => {
  const { default_payment_method } = await stripeProvider.subscription.get(stripeSubscription);

  return default_payment_method;
};

export const reactivateSubscription = async (subscriptionData: Subscription) => {
  const stripeSubscription = await stripeProvider.subscription.get(
    subscriptionData.stripeSubscription,
  );
  const customerId: string =
    (stripeSubscription.customer as Stripe.Customer)?.id ?? stripeSubscription.customer;

  if (stripeSubscription.status === 'canceled') {
    const newSubscription = await stripeProvider.subscription.create(
      customerId,
      subscriptionData.priceId,
      1,
      0,
    );
    await subscriptionSource.updateOne(subscriptionData._id, {
      stripeSubscription: newSubscription.id,
    });
    return newSubscription;
  }

  // else if (subscription.status === 'active') {
  //   // Subscription is still active, no reactivation is needed.
  // } else if (subscription.status === 'incomplete' || subscription.status === 'past_due') {
  //   // You might be able to update the subscription.
  // }
};
