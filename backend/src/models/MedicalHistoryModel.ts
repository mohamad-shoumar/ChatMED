import mongoose, { Document, Model } from "mongoose";

export interface IMedicalHistory extends mongoose.Document {
  user: string;
  height: number;
  weight: number;
  allergies: {
    name: string;
    date: Date;
  }[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  surgeries: {
    name: string;
    date: Date;
  }[];
  chronicConditions: {
    name: string;
    date: Date;
  }[];
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
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
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  medications: [
    {
      name: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      frequency: {
        type: String,
        required: true,
      },
    },
  ],
  surgeries: [
    {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  chronicConditions: [
    {
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
});

const MedicalHistoryModel: Model<IMedicalHistory> =
  mongoose.model<IMedicalHistory>("MedicalHistory", MedicalHistorySchema);

export default MedicalHistoryModel;
