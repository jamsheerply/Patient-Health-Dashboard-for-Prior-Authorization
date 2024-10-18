import Joi from "joi";

export const authorizationRequestSchema = Joi.object({
  patientId: Joi.string().required(),
  treatmentType: Joi.string().required(),
  insurancePlan: Joi.string().required(),
  dateOfService: Joi.date().iso().required(),
  diagnosisCode: Joi.string().required(),
  doctorNotes: Joi.string().required(),
});
