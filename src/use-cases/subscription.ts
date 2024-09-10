import { subscriptionSource } from '@data';
import { stripeProvider } from '@providers';

export const getSubscriptionByWorkspace = (workspace: string) => {
  return subscriptionSource.findOneByWorkspace(workspace);
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
