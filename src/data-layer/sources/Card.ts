import type { CardEntity, CardType } from '@domains';

import { ICardRepository, ICardSource } from '../interfaces';
import { BaseSource } from './Base';

export class CardDataSource extends BaseSource<CardEntity, CardType> implements ICardSource {
  protected repository: ICardRepository;

  constructor(repository: ICardRepository) {
    super(repository);
  }
}
