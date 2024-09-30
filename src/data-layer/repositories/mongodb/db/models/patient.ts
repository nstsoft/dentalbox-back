import type { PatientType } from '@domains';
import { removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('patients')
export class PatientModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ unique: true, type: 'text' })
  email: string;
  @Column({ unique: false, type: 'text' })
  name: string;
  @Column({ unique: false, type: 'text' })
  surname: string;
  @Column({ unique: false, type: 'text' })
  secondName: string;
  @Column({ unique: false, type: 'text' })
  phone: string;
  @Column({ unique: false, type: 'text' })
  address: string;
  @Column({ unique: false, type: 'text' })
  notes?: string;
  @Column({ type: 'timestamptz', nullable: true })
  dob?: Date;
  @Column({ array: false })
  workspace: ObjectId;
  @Column({ array: false })
  card: ObjectId;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column({ unique: false, type: 'text' })
  image?: string;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  constructor(patient: PatientType) {
    this.email = patient?.email;
    this.name = patient?.name;
    this.secondName = patient?.secondName;
    this.surname = patient?.surname;
    this.phone = patient?.phone;
    this.address = patient?.address;
    this.notes = patient?.notes;
    this.dob = new Date(patient?.dob ?? Date.now());
    this.image = patient?.image;

    if (patient?.card) {
      this.card = new ObjectId(patient.card);
    }
    if (patient?.workspace) {
      this.card = new ObjectId(patient.workspace);
    }
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
