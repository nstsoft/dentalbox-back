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
