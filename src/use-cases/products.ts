import { stripeProvider } from '@providers';

export const getProductById = (id: string) => {
  return stripeProvider.getProductById(id);
};

export const getAllProducts = async () => {
  return stripeProvider.getProducts();
};
