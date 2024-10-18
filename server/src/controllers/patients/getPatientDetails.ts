import { Request, Response, NextFunction } from "express";
import patientModel from "../../model/patient.model";

const getPatientDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patientId = req.params.id;
    console.log("patientId", patientId);

    const patient = await patientModel.findById(patientId).lean();

    if (!patient) {
      res.status(404).json({
        success: false,
        message: "Patient not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("getPatientDetails : ", error);
    next(error);
  }
};

export default getPatientDetails;
