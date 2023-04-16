import { Request, Response } from "express";
import User, { IUser } from "../models/UserModel";
import Patient, { IPatient } from "../models/PatientModel";
import Doctor, { IDoctor } from "../models/DoctorModel";
import MedicalHistory, { IMedicalHistory } from "../models/MedicalHistoryModel";
import jwt from "jsonwebtoken";
import moment from "moment";

// Get all doctors
export const getDoctors = async (req: Request, response: Response) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    response.json(doctors);
  } catch (error) {
    response.status(500).json({ message: "Server error" });
  }
};

// edit profile
export const editProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.user;
    const { fullName, email, picture } = req.body;

    const retrievedUser = await User.findById(id);

    if (!retrievedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    retrievedUser.fullName = fullName || retrievedUser.fullName;
    retrievedUser.email = email || retrievedUser.email;
    retrievedUser.picture = picture || retrievedUser.picture;
    const updatedUser = await retrievedUser.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get profile
export const getProfile = async (req: Request, response: Response) => {
  try {
    const user = req.body.user;
    console.log(user);

    const retreiveduser = await User.findOne({ email: user.email });
    console.log(retreiveduser);

    if (!retreiveduser) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    response.json(retreiveduser);
  } catch (error) {
    response.status(500).json({ message: "Server error" });
  }
};
// chooseDoctor
export const chooseDoctor = async (req: Request, response: Response) => {
  const id = req.body.user.id;
  const doctorEmail = req.body.email;
  console.log(id);
  console.log(doctorEmail);
  try {
    const patient = await Patient.findOne({ user: id });
    const doctor = await User.findOne({ email: doctorEmail });
    let doctorId = doctor?._id;
    console.log(doctorId);

    if (!patient) {
      response.status(404).json({ message: "Patient not found" });
      return;
    }
    if (!doctor) {
      response.status(404).json({ message: "Doctor not found" });
      return;
    }
    let docList: any = {};
    docList = await Doctor.findOne({ user: doctorId }, { patients: 1 });
    if (!docList) {
      docList = new Doctor({ user: doctorId, patients: [id] });
      await docList.save();
    } else {
      docList = await Doctor.findOneAndUpdate(
        { user: doctorId },
        { $push: { patients: id } },
        { new: true }
      );
      await docList.save();
    }
    response.json(docList);
  } catch (error) {
    response.status(500).json({ message: error });
  }
};
