import { PlanPeriod } from '@domains';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('plans')
export class PlanModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ unique: false, type: 'string' })
  name: string;
  @Column({ unique: false, type: 'number' })
  totalMembers: number;
  @Column({ unique: false, type: 'number' })
  price: number;
  @Column({ type: 'enum', enum: PlanPeriod, default: PlanPeriod.monthly, array: false })
  type: PlanPeriod;
}
