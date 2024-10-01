import { BaseEntity, SEGMENT_COLORS } from '@utils';

type Tooth = { removed: boolean; crown: boolean; implant: boolean; description?: string };
export type Zone4 = { z1: boolean; z2: boolean; z3: boolean; z4: boolean };
export type Zone5 = Zone4 & { z5: boolean };
export type Segment2 = { c1: SEGMENT_COLORS; c2: SEGMENT_COLORS };
export type Segment4 = Segment2 & { c3: SEGMENT_COLORS; c4: SEGMENT_COLORS };
export type FiveZoneTooth = Tooth & { zones: Zone5; segments: Segment4 };
export type FourZoneTooth = Tooth & { zones: Zone4; segments: Segment2 };

export type Chart = {
  t18: FiveZoneTooth;
  t16: FiveZoneTooth;
  t28: FiveZoneTooth;
  t27: FiveZoneTooth;
  t26: FiveZoneTooth;
  t38: FiveZoneTooth;
  t37: FiveZoneTooth;
  t36: FiveZoneTooth;
  t48: FiveZoneTooth;
  t47: FiveZoneTooth;
  t17: FiveZoneTooth;
  t46: FiveZoneTooth;
  t15: FourZoneTooth;
  t14: FourZoneTooth;
  t13: FourZoneTooth;
  t12: FourZoneTooth;
  t11: FourZoneTooth;
  t25: FourZoneTooth;
  t24: FourZoneTooth;
  t23: FourZoneTooth;
  t22: FourZoneTooth;
  t21: FourZoneTooth;
  t35: FourZoneTooth;
  t34: FourZoneTooth;
  t33: FourZoneTooth;
  t32: FourZoneTooth;
  t31: FourZoneTooth;
  t45: FourZoneTooth;
  t44: FourZoneTooth;
  t43: FourZoneTooth;
  t42: FourZoneTooth;
  t41: FourZoneTooth;
};

export type DentalMapType = {
  patient: string;
  notes?: string;
  chart: Chart;
};

export type RawDentalMap = DentalMapType & { _id: string };

export type DentalMapEntity = BaseEntity<RawDentalMap> & {
  resetChart(): void;
};
