import { NextFunction, Request, Response } from "express";
import signupValidationSchema from "../../utils/validation/signupValidation";
import { createNodemailerClient } from "../../utils/nodeMailer";
import userModel from "../../model/user.model";
import otpModel from "../../model/otp.model";

const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, email, username } = req.body;

    // Signup validation
    const { error } = signupValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ status: false, message: error.message });
      return;
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      res.status(409).json({ status: false, message: "User already exists" });
      return;
    }

    const otpExist = await otpModel.findOne({ email });
    let createOtp: string;

    if (!otpExist) {
      createOtp = Math.floor(100000 + Math.random() * 900000).toString();

      const createdOtp = await new otpModel({
        email: email,
        otp: createOtp,
      }).save();
      console.log(createdOtp);
    } else {
      createOtp = otpExist.otp;
    }

    const nodeMailerClient = createNodemailerClient();

    await nodeMailerClient.send({
      recipientEmail: email,
      subject: "Login verification OTP",
      content: `Your OTP for login verification is: ${createOtp}`,
    });

    res.status(201).json({
      status: true,
      user: { email: email },
      message: "Please check your email for OTP",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    next(error);
  }
};

export default signupController;
