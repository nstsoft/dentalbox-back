import { stripeProvider } from '@providers';

export const createSetupIntent = (customer: string) => {
  return stripeProvider.intent.createSetup(customer);
};

export const retrievePaymentMethods = async (customer: string) => {
  const { data } = await stripeProvider.paymentMethod.list(customer);

  return data.map((el) => ({
    id: el.id,
    last4: el.card?.last4,
    exp_month: el.card?.exp_month,
    exp_year: el.card?.exp_year,
    created: el.created,
    billing_details: el.billing_details,
    brand: el.card?.brand,
    country: el.card?.country,
  }));
};

export const getClientSecret = async (stripeSubscriptionId: string, customerId: string) => {
  const subscription = await stripeProvider.subscription.get(stripeSubscriptionId);

  let type = 'setup';
  let clientSecret = subscription?.pending_setup_intent?.client_secret;

  const intent = subscription?.latest_invoice?.payment_intent;

  if (intent?.client_secret && intent?.status !== 'succeeded') {
    type = 'payment';
    clientSecret = intent.client_secret;
  }

  if (!clientSecret) {
    const intent = await stripeProvider.intent.createSetup(customerId);
    clientSecret = intent.client_secret;
  }

  return { type, clientSecret, subscription };
};

export const deletePaymentMethod = async (paymentMethodId: string) => {
  return stripeProvider.paymentMethod.delete(paymentMethodId);
};
