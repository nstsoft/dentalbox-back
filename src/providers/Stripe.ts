import { config } from '@config';
import { Stripe } from 'stripe';

class StripeProvider {
  private stripe = new Stripe(config.STRIPE_SECRET_KEY);

  private async getProducts() {
    const [products, prices] = await Promise.all([
      this.stripe.products.list({ active: true }).then(({ data }) => data),
      this.stripe.prices.list({ active: true, limit: 100 }).then(({ data }) => data),
    ]);

    return products.map((product) => ({
      ...this.parseProduct(product),
      prices: prices.filter((price) => product.id === price.product).map(this.parsePrice),
    }));
  }

  private async createSetupIntent(customer: string) {
    return this.stripe.setupIntents.create({ customer });
  }

  private async getProductById(productId: string) {
    const [prices, product] = await Promise.all([
      this.stripe.prices.list({ active: true, product: productId }).then(({ data }) => data),
      this.stripe.products.retrieve(productId),
    ]);

    return {
      ...this.parseProduct(product),
      prices: prices.map(this.parsePrice),
    };
  }

  private createCustomer(email: string) {
    return this.stripe.customers.create({ email });
  }

  private createSubscription(customer: string, price: string, quantity = 1) {
    return this.stripe.subscriptions.create({
      customer,
      items: [{ price, quantity }],
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
      trial_period_days: 10,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
    });
  }

  private removeCustomer(customerId: string) {
    return this.stripe.customers.del(customerId);
  }

  private cancelSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.cancel(subscriptionId);
  }

  private getPriceById(id: string) {
    return this.stripe.prices.retrieve(id);
  }

  private parseProduct(product: Stripe.Product) {
    return {
      productId: product.id,
      image: product.images[0],
      metadata: product.metadata,
    };
  }

  private parsePrice(price: Stripe.Price) {
    return {
      priceId: price.id,
      currency: price.currency,
      amount: price.unit_amount,
      interval: price.recurring?.interval,
      productId: price.product,
    };
  }

  get customer() {
    return {
      remove: this.removeCustomer.bind(this),
      create: this.createCustomer.bind(this),
    };
  }

  get product() {
    return {
      getList: this.getProducts.bind(this),
      getOne: this.getProductById.bind(this),
    };
  }

  get price() {
    return {
      getOne: this.getPriceById.bind(this),
    };
  }

  get intent() {
    return {
      createSetup: this.createSetupIntent.bind(this),
    };
  }

  get subscription() {
    return {
      create: this.createSubscription.bind(this),
      cancel: this.cancelSubscription.bind(this),
      get: (subscriptionId: string) =>
        this.stripe.subscriptions.retrieve(subscriptionId, {
          expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
        }) as Promise<
          Stripe.Subscription & {
            pending_setup_intent: Stripe.SetupIntent | null;
            latest_invoice:
              | (Stripe.Invoice & {
                  payment_intent: Stripe.PaymentIntent | null;
                })
              | null;
          }
        >,
    };
  }
}

export const stripeProvider = new StripeProvider();
