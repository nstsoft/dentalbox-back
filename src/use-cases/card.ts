import { cardSource } from '@data';

export const createCard = async (patient: string) => {
  return cardSource.create({ patient, images: [] });
};
