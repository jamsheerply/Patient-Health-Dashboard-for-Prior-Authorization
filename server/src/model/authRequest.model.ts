import { Schema, model, Document, Types } from "mongoose";

interface IAuthRequest extends Document {
  patientId: Types.ObjectId;
  treatmentType: string;
  insurancePlan: string;
  dateOfService: Date;
  diagnosisCode: string;
  status: "pending" | "approved" | "denied";
  doctorNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AuthRequestSchema = new Schema<IAuthRequest>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    treatmentType: { type: String, required: true },
    insurancePlan: { type: String, required: true },
    dateOfService: { type: Date, required: true },
    diagnosisCode: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
    doctorNotes: { type: String },
  },
  { timestamps: true }
);

export default model<IAuthRequest>("AuthRequest", AuthRequestSchema);
