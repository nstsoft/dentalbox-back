import { SubscriptionType } from '@domains';
import { removeUndefinedProps } from '@utils';
import { ObjectId } from 'mongodb';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('subscriptions')
export class SubscriptionModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ array: false })
  workspace: ObjectId;
  @Column({ unique: false, nullable: false, type: 'string' })
  product: string;
  @Column({ unique: false, nullable: false, type: 'string' })
  interval: string;
  @Column({ unique: false, nullable: false, type: 'string' })
  priceId: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column({ unique: false, type: 'text', nullable: false })
  stripeSubscription: string;

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
      this.product = subscription?.product;
      this.priceId = subscription?.priceId;
      this.stripeSubscription = subscription?.stripeSubscription;
    }
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
