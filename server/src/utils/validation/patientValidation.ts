import Joi from "joi";

export const patientValidationSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  condition: Joi.string().required(),
  medicalHistory: Joi.array().items(
    Joi.object({
      date: Joi.date().required(),
      treatment: Joi.string().required(),
      notes: Joi.string().required(),
    })
  ),
  medications: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      dosage: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date(),
    })
  ),
  labResults: Joi.array().items(
    Joi.object({
      date: Joi.date().required(),
      test: Joi.string().required(),
      result: Joi.string().required(),
    })
  ),
});
