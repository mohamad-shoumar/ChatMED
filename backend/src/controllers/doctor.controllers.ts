import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Doctor, { IDoctor } from "../models/DoctorModel";
import User, { IUser } from "../models/UserModel";
import MedicalHistory from "../models/MedicalHistoryModel";
import Vitals, { IVital } from "../models/VitalModel";
import ResponseModel from "../models/ResponseModel";

// get file

// edit profile
export const editProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const {
      displayName,
      price,
      specialization,
      workingHours,
      email,
      profilePictureUrl,
    } = req.body;
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
    typedDoctor.specialization = specialization || typedDoctor.specialization;
    const updatedDoctor = await typedDoctor.save();

    const retrievedUser = await User.findOne({ _id: userId });

    if (!retrievedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    retrievedUser.displayName = displayName || retrievedUser.displayName;
    retrievedUser.email = email || retrievedUser.email;
    retrievedUser.imageUrl = profilePictureUrl || retrievedUser.imageUrl;
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
    const userInfo = req.body.user;
    console.log(userInfo);

    // const doctor = await Doctor.findOne({ user: doctorInfo });
    const user = await User.findOne({ email: userInfo.email });

    console.log(user);

    if (!user) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    response.json(user);
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
    console.log(doctorId);

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
// get responses(serach response collection and get the list of responses with dr id)
export const getConsultations = async (req: Request, response: Response) => {
  const doctorId = req.body.user.id;

  const responses = await ResponseModel.find({
    doctor: doctorId,
  });

  return response.json({ responses });
};
// edit the response
export const editResponse = async (req: Request, res: Response) => {
  const responseId = req.params.id;
  const { diagnosis, treatmentPlan } = req.body;

  try {
    const responseObj = await ResponseModel.findById(responseId);
    if (!responseObj) {
      return res.status(404).json({ message: "Response not found" });
    }
    responseObj.diagnosis = diagnosis || responseObj.diagnosis;
    responseObj.treatmentPlan = treatmentPlan || responseObj.treatmentPlan;
    responseObj.status = "edited";
    await responseObj.save();
    return res.json(responseObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// submit response
export const submitResponse = async (req: Request, res: Response) => {
  const responseId = req.params.id;
  const { diagnosis, treatmentPlan } = req.body;

  try {
    const responseObj = await ResponseModel.findById(responseId);
    if (!responseObj) {
      return res.status(404).json({ message: "Response not found" });
    }
    responseObj.diagnosis = diagnosis || responseObj.diagnosis;
    responseObj.treatmentPlan = treatmentPlan || responseObj.treatmentPlan;
    responseObj.status = "submitted";
    await responseObj.save();
    return res.json(responseObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
