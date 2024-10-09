import type { PatientType } from '@domains';
import { removeUndefinedProps, Sex } from '@utils';
import { ObjectId } from 'mongodb';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('patients')
@Index(['_id', 'workspace'])
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
  @Column({ unique: true, type: 'text' })
  phone: string;
  @Column({ unique: false, type: 'text', nullable: true })
  address?: string;
  @Column({ unique: false, type: 'text' })
  notes?: string;
  @Column({ type: 'timestamptz', nullable: true })
  dob?: Date;
  @Column({ array: false })
  @Index({ unique: false })
  workspace: ObjectId;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column({ unique: false, type: 'text' })
  image?: string;
  @Column({ array: false, enum: Sex, default: Sex.male })
  sex: Sex;

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
    this.sex = patient?.sex;

    if (patient?.workspace) {
      this.workspace = new ObjectId(patient.workspace);
    }
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
