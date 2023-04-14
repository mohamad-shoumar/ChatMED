import mongoose, { Document, Model } from "mongoose";

export interface IChat extends mongoose.Document {
  patient: string;
  doctor: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

const { Schema } = mongoose;
const chatSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model<IChat>("Chat", chatSchema);
