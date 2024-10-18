import { Request, Response, NextFunction } from "express";
import authRequestModel from "../../model/authRequest.model";
import patientModel from "../../model/patient.model";

const getAuthRequestDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestId = req.params.id;

    const authRequest = await authRequestModel
      .find({ patientId: requestId })
      .lean();

    if (!authRequest) {
      res.status(404).json({
        success: false,
        message: "Authorization request not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: authRequest,
    });
  } catch (error) {
    console.error("getAuthRequestDetails : ", error);
    next(error);
  }
};

export default getAuthRequestDetails;
