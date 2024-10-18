import { Types } from "mongoose";
import jwt from "jsonwebtoken";

interface Payload {
  _id: Types.ObjectId;
  email: string;
}

export const generateToken = (payload: Payload): string => {
  const token = jwt.sign(payload, String(process.env.TOKEN_SECRET), {
    expiresIn: "30d",
  });

  return token;
};
