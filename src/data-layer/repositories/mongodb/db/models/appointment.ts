import type { AppointmentType } from '@domains';
import { removeUndefinedProps } from '@utils';
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

@Entity('appointments')
@Index(['_id', 'workspace'])
@Index(['_id', 'workspace', 'start', 'end'])
@Index(['_id', 'workspace', 'cabinet'])
@Index(['_id', 'workspace', 'cabinet', 'start', 'end'])
export class AppointmentModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ type: 'timestamptz', nullable: false })
  start: Date;
  @Column({ type: 'timestamptz', nullable: false })
  end: Date;
  @Column()
  @Index({ unique: false })
  workspace: ObjectId;
  @Column()
  @Index({ unique: false })
  patient: ObjectId;
  @Column()
  @Index({ unique: false })
  doctor: ObjectId;
  @Column()
  @Index({ unique: false })
  cabinet: ObjectId;
  @Column({ nullable: true })
  chair: ObjectId;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column({ unique: false, type: 'text' })
  notes?: string;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  constructor(appointment: AppointmentType) {
    if (!appointment) return;
    this.start = new Date(appointment?.start ?? Date.now());
    this.end = new Date(appointment?.end ?? Date.now());
    this.workspace = new ObjectId(appointment.workspace);
    this.cabinet = new ObjectId(appointment.cabinet);
    this.chair = new ObjectId(appointment.chair);
    this.patient = new ObjectId(appointment.patient);
    this.doctor = new ObjectId(appointment.doctor);
    this.notes = appointment.notes;
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
