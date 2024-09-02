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

  createCustomer(email: string, payment_method: string) {
    return this.stripe.customers.create({
      email,
      payment_method,
      invoice_settings: { default_payment_method: payment_method },
    });
  }

  createSubscription(customer: string, price: string, quantity = 1) {
    return this.stripe.subscriptions.create({
      customer,
      items: [{ price, quantity }],
      expand: ['latest_invoice.payment_intent'],
      trial_period_days: 10,
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
    };
  }
}

export const stripeProvider = new StripeProvider();
