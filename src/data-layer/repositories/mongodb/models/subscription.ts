import { SubscriptionStatus, SubscriptionType } from '@domains';
import { removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('subscriptions')
export class SubscriptionModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId;
  @Column({ array: false })
  workspace: ObjectId;
  @Column({ array: false })
  plan: ObjectId;
  @Column({ type: 'enum', enum: SubscriptionStatus, default: SubscriptionStatus.pending, array: false })
  status: SubscriptionStatus;
  @Column({ unique: false, nullable: false, type: 'number' })
  activeTill: number;
  @Column({ unique: false, nullable: false, type: 'string' })
  interval: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }

  constructor(subscription: SubscriptionType) {
    if (subscription) {
      this.workspace = new ObjectId(subscription?.workspace);
      this.plan = new ObjectId(subscription?.plan);
      this.activeTill = subscription?.activeTill;
      this.status = subscription?.status;
      this.interval = subscription?.interval;
      this._id = new ObjectId();
    }
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
