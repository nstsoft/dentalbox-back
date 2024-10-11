import { appointmentSource, cabinetSource, patientSource, userSource } from '@data';
import { type AppointmentListCriteria, AppointmentListFilter, AppointmentType } from '@domains';
import { AuthError } from '@errors';
import { Pagination } from '@utils';

export const getAppointmentList = (
  criteria: AppointmentListCriteria,
  pagination: Pagination,
  filter?: AppointmentListFilter,
) => {
  return appointmentSource.getAppointmentList(criteria, pagination, filter);
};

export const validateAppointment = async (appointment: AppointmentType) => {
  const [user, patient, cabinet] = await Promise.all([
    userSource.findOneById(appointment.doctor),
    patientSource.findOneById(appointment.patient),
    cabinetSource.findOneById(appointment.cabinet),
  ]);

  if (!user?.workspaces.includes(appointment.workspace)) {
    throw new AuthError('Forbidden', { message: 'Doctor is not in the workspace' });
  }
  if (patient?.workspace !== appointment.workspace) {
    throw new AuthError('Forbidden', { message: 'Patient is not in the workspace' });
  }
  if (cabinet?.workspace !== appointment.workspace) {
    throw new AuthError('Forbidden', { message: 'Cabinet is not in the workspace' });
  }
};

export const createAppointment = (appointment: AppointmentType) => {
  return appointmentSource.create(appointment);
};
