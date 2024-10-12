import { patientSource } from '@data';
import { PatientType } from '@domains';
import { uploadPatientAvatar } from '@services';

export const createPatient = async (data: PatientType, buffer?: Buffer) => {
  let image = undefined;
  const patient = await patientSource.create(data);
  if (buffer) {
    const { location } = await uploadPatientAvatar(patient._id, buffer);
    image = location;
    await patientSource.updateOne(patient._id, { image });
    patient.image = image;
  }
  return patient;
};

export const findPatientOrFail = async (patient: string, workspace: string) =>
  patientSource.findOneOrFail({ workspace, _id: patient });

export const getPatientsByWorkspace = async (
  workspace: string,
  pagination: { limit: number; skip: number },
  filter?: { search?: string },
) => {
  return patientSource.findAll({ workspace: { $in: [workspace] } }, pagination, filter);
};

export const getPatientSummary = async (workspace: string) => {
  return patientSource.getSummary(workspace);
};
