import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../../model/user.model";

const verifyUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ status: true, message: "token not found" });
      return;
    }
    const decode = jwt.verify(token, String(process.env.TOKEN_SECRET));
    const { _id } = decode as { _id: string };
    const user = await userModel.findOne({ _id });
    res.status(200).json({ staus: false, message: "success", user });
    return;
  } catch (error) {
    next(error);
  }
};

export default verifyUserController;
