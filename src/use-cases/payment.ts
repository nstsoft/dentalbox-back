import { stripeProvider } from '@providers';

export const createSetupIntent = (customer: string) => {
  return stripeProvider.intent.createSetup(customer);
};

export const getClientSecret = async (stripeSubscriptionId: string, customerId: string) => {
  const subscription = await stripeProvider.subscription.get(stripeSubscriptionId);

  let type = 'setup';

  if (subscription?.latest_invoice?.payment_intent?.client_secret) {
    type = 'payment';
  }

  let clientSecret =
    subscription?.pending_setup_intent?.client_secret ?? subscription?.latest_invoice?.payment_intent?.client_secret;

  if (!clientSecret) {
    const intent = await stripeProvider.intent.createSetup(customerId);
    clientSecret = intent.client_secret;
  }

  return { type, clientSecret };
};
