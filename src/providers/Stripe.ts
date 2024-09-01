import { config } from '@config';
import { Stripe } from 'stripe';

class StripeProvider {
  private stripe = new Stripe(config.STRIPE_SECRET_KEY);

  async getProducts() {
    return this.stripe.products
      .list({ expand: ['data.default_price'] })
      .then(({ data }) => data.map(this.parseProduct));
  }

  async getProductById(productId: string) {
    return this.stripe.products.retrieve(productId, { expand: ['default_price'] }).then((data) => {
      console.log(data);

      return this.parseProduct(data);
    });
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
}

export const stripeProvider = new StripeProvider();
