import { stripeProvider } from '@providers';

export const getPriceByIdById = (id: string) => {
  return stripeProvider.price.getOne(id);
};
