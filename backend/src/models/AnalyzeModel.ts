import mongoose, { Document, Schema } from "mongoose";

export interface IAnalyze extends Document {
  user: string;
  analysis: string;
}
const AnalyzeSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  analysis: {
    type: String,
  },
});

const Analyze = mongoose.model<IAnalyze>("Analyzes", AnalyzeSchema);

export default Analyze;
