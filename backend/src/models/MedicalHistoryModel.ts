import mongoose, { Document, Model } from "mongoose";

export interface IMedicalHistory extends mongoose.Document {
  user: string;
  height: number;
  weight: number;
  allergies: string[];
  medications: string[];
  surgeries: string[];
  chronicConditions: string[];
  dateOfBirth: Date;
}

const Schema = mongoose.Schema;
const MedicalHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  allergies: [
    {
      type: String,
    },
  ],
  medications: [
    {
      type: String,
    },
  ],
  surgeries: [
    {
      type: String,
    },
  ],
  chronicConditions: [
    {
      type: String,
    },
  ],

  dateOfBirth: {
    type: Date,
  },
});

const MedicalHistoryModel: Model<IMedicalHistory> =
  mongoose.model<IMedicalHistory>("MedicalHistory", MedicalHistorySchema);

export default MedicalHistoryModel;
