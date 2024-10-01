import { Card, type CardType } from '@domains';

import { ICardRepository } from '../../interfaces';
import { Repository } from './base';
import { CardModel } from './db';

export class CardRepository
  extends Repository<CardModel, Card, CardType>
  implements ICardRepository
{
  constructor() {
    super(CardModel, Card);
  }
}
