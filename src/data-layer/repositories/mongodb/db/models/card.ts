import { CardType } from '@domains';
import { removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('cards')
export class CardModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ unique: false, type: 'text' })
  notes?: string;
  @Column({ array: false })
  patient: ObjectId;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column({ unique: false, type: 'text', array: true, default: [] })
  images: string[];

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  constructor(card: CardType) {
    this.images = card?.images;
    this.notes = card?.notes;
    if (card?.patient) {
      this.patient = new ObjectId(card.patient);
    }
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
