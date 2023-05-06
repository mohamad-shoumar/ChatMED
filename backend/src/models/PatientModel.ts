import mongoose, { Document, Model } from "mongoose";

export interface IPatient extends mongoose.Document {
  user: string;
  consultations: {
    doctor: string;
    date?: Date;
  }[];
}

const Schema = mongoose.Schema;
const PatientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  consultations: [
    {
      doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
      },
      response: {
        type: Schema.Types.ObjectId,
        ref: "Response",
      },
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
});

const Patient = mongoose.model<IPatient>("Patient", PatientSchema);

export default Patient;
