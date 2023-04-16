import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Doctor, { IDoctor } from "../models/DoctorModel";
import User, { IUser } from "../models/UserModel";
import MedicalHistory from "../models/MedicalHistoryModel";
import Vitals, { IVital } from "../models/VitalModel";

// edit profile
export const editProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const { fullName, price, workingHours, email, picture } = req.body;
    console.log(req.body);
    console.log(userId);
    console.log(workingHours);

    const doctor = await Doctor.findOne({ user: userId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const typedDoctor = doctor as IDoctor;
    typedDoctor.price = price || typedDoctor.price;
    typedDoctor.workingHours = workingHours || typedDoctor.workingHours;
    const updatedDoctor = await typedDoctor.save();

    const retrievedUser = await User.findOne({ _id: userId });

    if (!retrievedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    retrievedUser.fullName = fullName || retrievedUser.fullName;
    retrievedUser.email = email || retrievedUser.email;
    retrievedUser.picture = picture || retrievedUser.picture;
    const updatedUser = await retrievedUser.save();
    res.json({ updatedDoctor, updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// get profile
export const getProfile = async (req: Request, response: Response) => {
  try {
    const doctorInfo = req.body.user.id;
    const userInfo = req.body.user.id;
    const doctor = await Doctor.findOne({ user: doctorInfo });
    const user = await User.findOne({ _id: userInfo });
    if (!doctor) {
      response.status(404).json({ message: "Doctor not found" });
      return;
    }
    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    response.json({ doctor, user });
  } catch (error) {
    response.status(500).json({ message: "Server error" });
  }
};
// getPatients
export const getPatients = async (req: Request, response: Response) => {
  try {
    const doctorId = req.body.user.id;
    const doctor = await Doctor.findOne({ user: doctorId });
    console.log(doctor);

    if (!doctor) {
      response.status(404).json({ message: "Doctor not found" });
      return;
    }
    const patients = await User.find({ _id: { $in: doctor.patients } });
    response.json(patients);
  } catch (error) {
    response.status(500).json({ message: "Server error" });
  }
};
// GetpatientMedicalHistory
export const getMedicalHistory = async (req: Request, response: Response) => {
  try {
    const patientId = req.body.patientId;
    const medicalHistory = await MedicalHistory.findOne({
      user: patientId,
    }).populate("user");
    if (!medicalHistory) {
      response.status(404).json({ message: "Medical history not found" });
      return;
    }
    response.json(medicalHistory);
  } catch (error) {
    response.status(500).json({ message: "Server error" });
  }
};
