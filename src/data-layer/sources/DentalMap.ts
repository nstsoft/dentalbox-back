import type { DentalMapEntity, DentalMapType } from '@domains';

import { IDentalMapRepository, IDentalMapSource } from '../interfaces';
import { BaseSource } from './Base';

export class DentalMapDataSource
  extends BaseSource<DentalMapEntity, DentalMapType>
  implements IDentalMapSource
{
  protected repository: IDentalMapRepository;

  constructor(repository: IDentalMapRepository) {
    super(repository);
  }
}
