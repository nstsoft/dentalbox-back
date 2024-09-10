import { stripeProvider } from '@providers';

export const getProductById = (id: string) => {
  return stripeProvider.product.getOne(id);
};

export const getAllProducts = async () => {
  return stripeProvider.product.getList();
};
