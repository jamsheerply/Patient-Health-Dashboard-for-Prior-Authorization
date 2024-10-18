import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import otpModel from "../../model/otp.model";
import { hashPassword } from "../../utils/hashPassword";
import userModel from "../../model/user.model";
import { generateToken } from "../../utils/generateToken";
import otpValidationSchema from "../../utils/validation/otpValidation";
import { CookieOptions } from "express";

// Interface for the request body
interface VerifyOtpRequestBody {
  email: string;
  otp: string;
  password: string;
  username: string;
}

export const cookieOptions: CookieOptions = {
  maxAge: 20 * 24 * 60 * 60 * 1000, // 20 days
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

const verifyOtpController = async (
  req: Request<{}, {}, VerifyOtpRequestBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, password, username } = req.body;

    const { error } = otpValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
      return;
    }

    const savedOtp = await otpModel.findOne({ email }).exec();
    if (!savedOtp) {
      res.status(400).json({
        status: false,
        message: "OTP not found for this email.",
      });
      return;
    }

    if (savedOtp.otp !== otp) {
      res.status(400).json({
        status: false,
        message: "Invalid OTP. Please check and try again.",
      });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      email,
      username,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const tokenPayload = {
      _id: user._id as Types.ObjectId,
      email: user.email,
    };

    const token = generateToken(tokenPayload);

    await otpModel.deleteOne({ email });

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        status: true,
        data: {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
        message: "User registered successfully",
      });
    return;
  } catch (error) {
    next(error);
  }
};

export default verifyOtpController;
