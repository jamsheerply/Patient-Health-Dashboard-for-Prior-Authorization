import { NextFunction, Request, Response } from "express";

const logoutController = (req: Request, res: Response, next: NextFunction) => {
  try {
    // res
    //   .cookie("token", "", {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "strict",
    //     expires: new Date(0),
    //   })
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      })
      .json({ status: true, message: "Logout successfully", user: null });
    return;
  } catch (error) {
    next(error);
  }
};
export default logoutController;
