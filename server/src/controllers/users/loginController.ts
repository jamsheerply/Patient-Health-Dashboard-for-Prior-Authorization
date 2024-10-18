import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import loginValidationSchema from "../../utils/validation/loginValidation";
import userModel from "../../model/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken";
import { cookieOptions } from "./verifyOtpController";

interface LoginRequestBody {
  email: string;
  password: string;
}

const loginController = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: false,
        errors: error.message,
      });
      return;
    }

    // Check if user exists and explicitly type the user document
    const userExist = await userModel
      .findOne({ email })
      .select("+password") // Include password field if it's not selected by default
      .exec();

    if (!userExist) {
      res.status(404).json({
        status: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Compare password
    const passCompare = await bcrypt.compare(password, userExist.password);
    if (!passCompare) {
      res.status(404).json({
        status: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Generate token with proper types
    const tokenPayload = {
      _id: userExist._id as Types.ObjectId,
      email: userExist.email,
    };

    const token = generateToken(tokenPayload);

    // Send response
    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        status: true,
        data: {
          _id: userExist._id,
          email: userExist.email,
        },
        message: "Login successful",
      });
    return;
  } catch (error) {
    next(error);
  }
};

export default loginController;
