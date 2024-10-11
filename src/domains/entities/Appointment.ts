import { RawAppointment } from '../types';
import { BaseEntity } from './Base';

export class Appointment extends BaseEntity {
  _id: string;
  start: string;
  end: string;
  workspace: string;
  patient: string;
  doctor: string;
  cabinet: string;
  chair?: string;
  notes?: string;

  constructor(data: RawAppointment) {
    super();
    this._id = data._id;
    this.start = data.start;
    this.end = data.end;
    this.workspace = data.workspace;
    this.patient = data.patient;
    this.doctor = data.doctor;
    this.cabinet = data.cabinet;
    this.chair = data.chair;
    this.notes = data.notes;
  }
}
