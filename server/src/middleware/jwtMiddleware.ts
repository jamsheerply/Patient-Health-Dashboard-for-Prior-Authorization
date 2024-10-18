import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

interface UserPayload {
  _id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

const verifyToken = (token: string, secret: string): UserPayload | null => {
  try {
    return jwt.verify(token, secret) as UserPayload;
  } catch (err) {
    if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError) {
      console.error(`Error verifying token: ${err.message}`);
      return null;
    }
    throw err;
  }
};

export const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { token } = req.cookies;
    let user: UserPayload | null = null;

    if (token) {
      user = verifyToken(token, process.env.TOKEN_SECRET!);
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized, please log in again." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in JWT middleware:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
