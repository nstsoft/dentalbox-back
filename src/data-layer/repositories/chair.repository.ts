import { Chair, type ChairType } from '@domains';

import { IChairRepository } from '../interfaces';
import { Repository } from './base';
import { ChairModel } from './mongodb';

export class ChairRepository extends Repository<ChairModel, Chair, ChairType> implements IChairRepository {
  constructor() {
    super(ChairModel, Chair);
  }
}
