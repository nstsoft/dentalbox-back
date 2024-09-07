import { config } from '@config';
import { Stripe } from 'stripe';

class StripeProvider {
  private stripe = new Stripe(config.STRIPE_SECRET_KEY);

  getProducts() {
    return this.stripe.products
      .list({ expand: ['data.default_price'] })
      .then(({ data }) => data.map(this.parseProduct));
  }

  getProductById(productId: string) {
    return this.stripe.products
      .retrieve(productId, { expand: ['default_price'] })
      .then((data) => this.parseProduct(data));
  }

  createCustomer(email: string) {
    return this.stripe.customers.create({ email });
  }

  createSubscription(customer: string, price: string, quantity = 1) {
    return this.stripe.subscriptions.create({
      customer,
      items: [{ price, quantity }],
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
      trial_period_days: 10,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
    });
  }

  removeCustomer(customerId: string) {
    return this.stripe.customers.del(customerId);
  }

  cancelSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.cancel(subscriptionId);
  }

  parseProduct(product: Stripe.Product) {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      active: product.active,
      name: product.name,
      description: product.description,
      image: product.images[0],
      interval: price.recurring?.interval,
      currency: price.currency,
      amount: price.unit_amount,
      priceId: price.id,
      priceActive: price.active,
      metadata: product.metadata,
    };
  }

  get customer() {
    return {
      removeCustomer: this.removeCustomer.bind(this),
      create: this.createCustomer.bind(this),
    };
  }

  get product() {
    return {
      getList: this.getProducts.bind(this),
      getOne: this.getProductById.bind(this),
    };
  }

  get subscription() {
    return {
      create: this.createSubscription.bind(this),
      cancel: this.cancelSubscription.bind(this),
      get: (subscriptionId: string) => this.stripe.subscriptions.retrieve(subscriptionId),
    };
  }
}

export const stripeProvider = new StripeProvider();
