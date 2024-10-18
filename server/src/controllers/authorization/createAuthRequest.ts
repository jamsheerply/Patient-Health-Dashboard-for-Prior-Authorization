import { Request, Response, NextFunction } from "express";
import AuthorizationRequest from "../../model/authRequest.model";
import { authorizationRequestSchema } from "../../utils/validation/authRequestValidation";

const createAuthRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    const { error } = authorizationRequestSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ success: false, message: error.details[0].message });
      return;
    }

    // Check for existing pending authorization requests
    const existingPendingRequest = await AuthorizationRequest.findOne({
      patientId: req.body.patientId,
      status: "pending",
    });

    if (existingPendingRequest) {
      res.status(200).json({
        success: false,
        message: "Patient already has a pending authorization request",
        existingRequest: {
          id: existingPendingRequest._id,
          treatmentType: existingPendingRequest.treatmentType,
          dateOfService: existingPendingRequest.dateOfService,
          createdAt: existingPendingRequest.createdAt,
        },
      });
      return;
    }

    // Create new authorization request
    const newAuthRequest = new AuthorizationRequest(req.body);
    await newAuthRequest.save();

    res.status(201).json({
      success: true,
      message: "Authorization request created successfully",
      data: newAuthRequest,
    });
    return;
  } catch (error) {
    console.error("createAuthRequest error:", error);
    next(error);
  }
};

export default createAuthRequest;
