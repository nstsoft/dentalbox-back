import { ChairType } from '@domains';
import { removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('chairs')
export class ChairModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ type: 'text' })
  name: string;
  @Column({ type: 'text' })
  notes?: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column({ array: false })
  cabinet: ObjectId;
  @Column({ array: false })
  workspace: ObjectId;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  constructor(chair: ChairType) {
    this.name = chair?.name;
    this.cabinet = new ObjectId(chair?.cabinet);
    this.workspace = new ObjectId(chair?.workspace);
    this.notes = chair?.notes;
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
