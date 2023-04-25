import mongoose, { Document, Model, Schema } from "mongoose";
import { IMedicalHistory } from "./MedicalHistoryModel";
export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  picture?: {
    data: Buffer;
    contentType: string;
  };
  fullName: string;

  consultations?: {
    doctor: string;
    date: Date;
  }[];
}

const UserSchema = new Schema<IUser>({
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
    data: Buffer,
    contentType: String,
  },

  fullName: {
    type: String,
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
