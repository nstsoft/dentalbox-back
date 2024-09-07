import { stripeProvider } from '@providers';

export const getPlanById = (id: string) => {
  return stripeProvider.getProductById(id);
};

export const getAllProducts = async () => {
  return stripeProvider.getProducts();
};
