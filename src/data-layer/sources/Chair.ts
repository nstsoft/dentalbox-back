import type { ChairEntity, ChairType } from '@domains';

import { IChairRepository, IChairSource } from '../interfaces';
import { BaseSource } from './Base';

export class ChairDataSource extends BaseSource<ChairEntity, ChairType> implements IChairSource {
  protected repository: IChairRepository;

  constructor(repository: IChairRepository) {
    super(repository);
  }
}
