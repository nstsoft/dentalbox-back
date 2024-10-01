import type { DentalMapType } from '@domains';
import { removeUndefinedProps, SEGMENT_COLORS } from '@utils';
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

export class Zone4 {
  @Column({ type: 'boolean', default: false })
  z1: boolean;
  @Column({ type: 'boolean', default: false })
  z2: boolean;
  @Column({ type: 'boolean', default: false })
  z3: boolean;
  @Column({ type: 'boolean', default: false })
  z4: boolean;
}

export class Zone5 extends Zone4 {
  @Column({ type: 'boolean', default: false })
  z5: boolean;
}

class Segment2 {
  @Column({ type: 'enum', enum: SEGMENT_COLORS, default: SEGMENT_COLORS.default, array: false })
  c1: SEGMENT_COLORS;
  @Column({ type: 'enum', enum: SEGMENT_COLORS, default: SEGMENT_COLORS.default, array: false })
  c2: SEGMENT_COLORS;
}

class Segment4 extends Segment2 {
  @Column({ type: 'enum', enum: SEGMENT_COLORS, default: SEGMENT_COLORS.default, array: false })
  c3: SEGMENT_COLORS;
  @Column({ type: 'enum', enum: SEGMENT_COLORS, default: SEGMENT_COLORS.default, array: false })
  c4: SEGMENT_COLORS;
}

class Tooth {
  @Column({ type: 'boolean', default: false })
  removed: boolean;
  @Column({ type: 'boolean', default: false })
  crown: boolean;
  @Column({ type: 'boolean', default: false })
  implant: boolean;
  @Column({ type: 'text', nullable: true })
  description?: string;
}

class FiveZoneTooth extends Tooth {
  @Column({ array: false })
  zones: Zone5;
  @Column({ array: false })
  segments: Segment4;
}

class FourZoneToothSchema extends Tooth {
  @Column({ array: false })
  zones: Zone4;
  @Column({ array: false })
  segments: Segment2;
}

class Chart {
  @Column({ array: false }) t18: FiveZoneTooth;
  @Column({ array: false }) t16: FiveZoneTooth;
  @Column({ array: false }) t28: FiveZoneTooth;
  @Column({ array: false }) t27: FiveZoneTooth;
  @Column({ array: false }) t26: FiveZoneTooth;
  @Column({ array: false }) t38: FiveZoneTooth;
  @Column({ array: false }) t37: FiveZoneTooth;
  @Column({ array: false }) t36: FiveZoneTooth;
  @Column({ array: false }) t48: FiveZoneTooth;
  @Column({ array: false }) t47: FiveZoneTooth;
  @Column({ array: false }) t17: FiveZoneTooth;
  @Column({ array: false }) t46: FiveZoneTooth;
  @Column({ array: false }) t15: FourZoneToothSchema;
  @Column({ array: false }) t14: FourZoneToothSchema;
  @Column({ array: false }) t13: FourZoneToothSchema;
  @Column({ array: false }) t12: FourZoneToothSchema;
  @Column({ array: false }) t11: FourZoneToothSchema;
  @Column({ array: false }) t25: FourZoneToothSchema;
  @Column({ array: false }) t24: FourZoneToothSchema;
  @Column({ array: false }) t23: FourZoneToothSchema;
  @Column({ array: false }) t22: FourZoneToothSchema;
  @Column({ array: false }) t21: FourZoneToothSchema;
  @Column({ array: false }) t35: FourZoneToothSchema;
  @Column({ array: false }) t34: FourZoneToothSchema;
  @Column({ array: false }) t33: FourZoneToothSchema;
  @Column({ array: false }) t32: FourZoneToothSchema;
  @Column({ array: false }) t31: FourZoneToothSchema;
  @Column({ array: false }) t45: FourZoneToothSchema;
  @Column({ array: false }) t44: FourZoneToothSchema;
  @Column({ array: false }) t43: FourZoneToothSchema;
  @Column({ array: false }) t42: FourZoneToothSchema;
  @Column({ array: false }) t41: FourZoneToothSchema;
}

@Entity('dentalMap')
@Index(['patient', '_id'], { unique: false })
export class DentalMapModel {
  @PrimaryColumn()
  @ObjectIdColumn()
  _id: ObjectId = new ObjectId();
  @Column({ array: false, unique: true })
  patient: ObjectId;
  @Column({ unique: false, type: 'text' })
  notes?: string;
  @Column({ array: false })
  chart: Chart;
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

  constructor(dentalMap: DentalMapType) {
    this.notes = dentalMap?.notes;
    this.chart = dentalMap?.chart;
    if (dentalMap?.patient) {
      this.patient = new ObjectId(dentalMap.patient);
    }
  }

  toPlain() {
    return removeUndefinedProps(this);
  }
}
