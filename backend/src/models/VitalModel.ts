import mongoose, { Document, Schema } from "mongoose";

export interface IVital extends Document {
  user: string;
  bloodPressure?: { value: string; timestamp?: Date }[];
  heartRate?: { value: number; timestamp?: Date }[];
  bloodsugar?: { value: number; timestamp?: Date }[];
}
const VitalSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    bloodPressure: [
      {
        value: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    heartRate: [
      {
        value: {
          type: Number,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    bloodsugar: [
      {
        value: {
          type: Number,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Vital = mongoose.model<IVital>("Vitals", VitalSchema);

export default Vital;
