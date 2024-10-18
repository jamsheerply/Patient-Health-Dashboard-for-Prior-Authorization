import { Schema, model, Document } from "mongoose";

interface MedicalHistory {
  date: Date;
  treatment: String;
  notes: String;
}

interface Medication {
  name: String;
  dosage: String;
  startDate: Date;
  endDate: Date;
}

interface LabResult {
  date: Date;
  test: String;
  result: String;
}

export interface PatientDocument extends Document {
  name: string;
  age: number;
  condition: string;
  medicalHistory: MedicalHistory[];
  medications: Medication[];
  labResults: LabResult[];
}

const PatientSchema = new Schema<PatientDocument>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  medicalHistory: [
    {
      date: { type: Date, required: true },
      treatment: { type: String, required: true },
      notes: { type: String, required: true },
    },
  ],
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
    },
  ],
  labResults: [
    {
      date: { type: Date, required: true },
      test: { type: String, required: true },
      result: { type: String, required: true },
    },
  ],
});

export default model<PatientDocument>("Patient", PatientSchema);
