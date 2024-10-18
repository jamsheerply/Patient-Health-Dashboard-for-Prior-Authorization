import { Request, Response, NextFunction } from "express";
import patientModel, { PatientDocument } from "../../model/patient.model";
import { patientValidationSchema } from "../../utils/validation/patientValidation";

const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = patientValidationSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ success: false, message: error.details[0].message });
      return;
    }

    const existingPatient = await patientModel.findOne({ name: req.body.name });
    if (existingPatient) {
      res.status(409).json({
        success: false,
        message: "Patient with the same name already exists",
      });
      return;
    }

    const newPatient: PatientDocument = new patientModel(req.body);
    await newPatient.save();

    res.status(201).json({ success: true, data: newPatient });
  } catch (error) {
    console.error("createPatient : ", error);
    next(error);
  }
};

export default createPatient;
