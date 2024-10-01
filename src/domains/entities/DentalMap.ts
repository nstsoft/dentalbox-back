import { SEGMENT_COLORS } from '@utils';

import { Chart, RawDentalMap } from '../types';
import { BaseEntity } from './Base';

const defaultTooth = {
  removed: false,
  crown: false,
  implant: false,
};

const default4ZoneTooth = {
  zones: {
    z1: false,
    z2: false,
    z3: false,
    z4: false,
  },

  segments: { c1: SEGMENT_COLORS.default, c2: SEGMENT_COLORS.default },
  ...defaultTooth,
};

const default5ZoneTooth = {
  zones: {
    z1: false,
    z2: false,
    z3: false,
    z4: false,
    z5: false,
  },

  segments: {
    c1: SEGMENT_COLORS.default,
    c2: SEGMENT_COLORS.default,
    c3: SEGMENT_COLORS.default,
    c4: SEGMENT_COLORS.default,
  },
  ...defaultTooth,
};

export class DentalMap extends BaseEntity {
  chart: Chart;
  notes?: string;
  patient: string;
  _id: string;

  constructor(
    dentalMap: Omit<RawDentalMap, 'chart' | '_id'> & Partial<Pick<RawDentalMap, 'chart' | '_id'>>,
  ) {
    super();
    this.notes = dentalMap.notes;
    this.patient = dentalMap.patient;

    if (dentalMap?.chart) {
      this.chart = dentalMap.chart;
    }
    if (dentalMap?._id) {
      this._id = dentalMap._id;
    }
  }

  resetChart() {
    this.chart = {
      t18: default5ZoneTooth,
      t16: default5ZoneTooth,
      t28: default5ZoneTooth,
      t27: default5ZoneTooth,
      t26: default5ZoneTooth,
      t38: default5ZoneTooth,
      t37: default5ZoneTooth,
      t17: default5ZoneTooth,
      t36: default5ZoneTooth,
      t48: default5ZoneTooth,
      t47: default5ZoneTooth,
      t46: default5ZoneTooth,
      t15: default4ZoneTooth,
      t14: default4ZoneTooth,
      t13: default4ZoneTooth,
      t12: default4ZoneTooth,
      t11: default4ZoneTooth,
      t25: default4ZoneTooth,
      t24: default4ZoneTooth,
      t23: default4ZoneTooth,
      t22: default4ZoneTooth,
      t21: default4ZoneTooth,
      t35: default4ZoneTooth,
      t34: default4ZoneTooth,
      t33: default4ZoneTooth,
      t32: default4ZoneTooth,
      t31: default4ZoneTooth,
      t45: default4ZoneTooth,
      t44: default4ZoneTooth,
      t43: default4ZoneTooth,
      t42: default4ZoneTooth,
      t41: default4ZoneTooth,
    };
  }
}
