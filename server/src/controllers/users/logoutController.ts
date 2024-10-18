import { NextFunction, Request, Response } from "express";

const logoutController = (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      })
      .json({ status: true, message: "Logout successfully", user: null });
    return;
  } catch (error) {
    next(error);
  }
};
export default logoutController;
