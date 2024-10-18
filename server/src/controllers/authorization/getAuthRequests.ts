import { Request, Response, NextFunction } from "express";
import AuthRequest from "../../model/authRequest.model";
import { PatientDocument } from "../../model/patient.model";
import { Types } from "mongoose";

interface LeanAuthRequest {
  _id: Types.ObjectId;
  patientId: {
    _id: Types.ObjectId;
    name: string;
  };
  treatmentType: string;
  status: "pending" | "approved" | "denied";
  createdAt: Date;
}

const getAuthRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authRequests = await AuthRequest.find()
      .populate<{ patientId: PatientDocument }>({
        path: "patientId",
        select: "name",
      })
      .lean<LeanAuthRequest[]>();

    const formattedRequests = authRequests.map((request) => ({
      id: request._id,
      patientId: request.patientId._id,
      patientName: request.patientId.name,
      treatmentType: request.treatmentType,
      status: request.status,
      createdAt: request.createdAt,
    }));

    res.status(200).json({
      success: true,
      requests: formattedRequests,
    });
  } catch (error) {
    console.error("getAuthRequests : ", error);
    next(error);
  }
};

export default getAuthRequests;
