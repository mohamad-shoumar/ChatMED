import mongoose, { Document, Model } from "mongoose";

export interface IResponse extends mongoose.Document {
  patient: string;
  doctor: string;
  symptoms: string;
  diagnosis: string;
  treatmentPlan: string;
  status: string;
  date: Date;
}
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  treatmentPlan: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "edited", "Chat", "completed"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ResponseModel: Model<IResponse> = mongoose.model<IResponse>(
  "Response",
  ResponseSchema
);

module.exports = ResponseModel;
