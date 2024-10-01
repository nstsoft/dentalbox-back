import { RawCard } from '../types';
import { BaseEntity } from './Base';

export class Card extends BaseEntity {
  images: string[];
  notes?: string;
  patient: string;
  _id: string;

  constructor(card: RawCard) {
    super();
    this._id = card._id;
    this.images = card.images;
    this.notes = card.notes;
    this.patient = card.patient;
  }
}
