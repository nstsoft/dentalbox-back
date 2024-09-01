import { stripeProvider } from '@providers';

export const getPlanById = (id: string) => {
  return stripeProvider.getProductById(id);
};

export const getAllPlans = async () => {
  return stripeProvider.getProducts();
};
