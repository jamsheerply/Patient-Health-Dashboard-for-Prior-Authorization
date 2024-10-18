import { Schema, model, Document } from "mongoose";

interface IOtp extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  updatedAt?: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 120,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IOtp>("Otp", otpSchema);
