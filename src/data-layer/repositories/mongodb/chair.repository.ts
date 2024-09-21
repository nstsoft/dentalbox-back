import { Chair, type ChairType } from '@domains';

import { IChairRepository } from '../../interfaces';
import { Repository } from './base';
import { ChairModel } from './db';

export class ChairRepository
  extends Repository<ChairModel, Chair, ChairType>
  implements IChairRepository
{
  constructor() {
    super(ChairModel, Chair);
  }
}
