import mongoose, { Document, Model } from "mongoose";

export interface IAdvice extends mongoose.Document {
  user: string;
  medicalHistory: string;
  advice: string;
}

const Schema = mongoose.Schema;
const AdviceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  medicalHistory: {
    type: Schema.Types.ObjectId,
    ref: "MedicalHistory",
  },
  advice: {
    type: String,
    required: true,
  },
});

const Advice = mongoose.model<IAdvice>("Advice", AdviceSchema);

export default Advice;
