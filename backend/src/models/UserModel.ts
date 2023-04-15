import mongoose, { Document, Model, Schema } from "mongoose";
import { IMedicalHistory } from "./MedicalHistoryModel";
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  picture?: string;
  fullName: string;
  gender: "male" | "female" | "other";
  consultations?: {
    doctor: string;
    date: Date;
  }[];
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    hashed: true,
  },
  role: {
    type: String,
    enum: ["patient", "doctor"],
    required: true,
  },
  picture: {
    type: String,
  },

  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  consultations: [
    {
      doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
