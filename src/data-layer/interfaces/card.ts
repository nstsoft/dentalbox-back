import type { CardEntity, CardType } from '../../domains/types';
import { IDataSource, IRepositorySource } from './base.source';

export interface ICardRepository extends IRepositorySource<CardEntity, CardType> {}
export interface ICardSource extends IDataSource<CardEntity, CardType> {}
