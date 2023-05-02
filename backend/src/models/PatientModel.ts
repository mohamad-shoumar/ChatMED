import mongoose, { Document, Model } from "mongoose";

export interface IPatient extends mongoose.Document {
  user: string;
  consultations: {
    doctor: string;
    date: Date;
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
        ref: "Response",
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

const Patient = mongoose.model<IPatient>("Patient", PatientSchema);

export default Patient;
