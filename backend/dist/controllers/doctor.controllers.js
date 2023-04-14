"use strict";
// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import Doctor, { IDoctor } from "../models/DoctorModel";
// import UserModel, { IUser } from "../models/UserModel";
// import MedicalHistoryModel, {
//   IMedicalHistory,
// } from "../models/MedicalHistoryModel";
// import Vitals, { IVital } from "../models/VitalModel";
// export const getPatient = async (req: Request, response: Response) => {
//   try {
//     const { user } = req.body;
//     const patient = await User.findById(user.id);
//     if (!patient) {
//       return response.status(404).json({ message: "Patient not found" });
//     }
//     response.json(patient);
//   } catch (error) {
//     response.status(500).json({ message: "Server error" });
//   }
// };
// // Get a list of all the patients assigned to the current doctor
// export const getPatientsByDoctor = async (req: Request, res: Response) => {
//   try {
//     const { doctorId } = req.params;
//     const doctor = await Doctor.findById(doctorId).populate("patients");
//     if (!doctor) {
//       res.status(404).json({ message: "Doctor not found" });
//       return;
//     }
//     res.json(doctor.patients);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// // Get a patient's medical history
// export const getMedicalHistory = async (req: Request, res: Response) => {
//   try {
//     const { _id: doctorId } = req.user;
//     const { patientId } = req.params;
//     const doctor: IDoctor | null = await DoctorModel.findOne({
//       user: doctorId,
//     });
//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }
//     const medicalHistory: IMedicalHistory | null =
//       await MedicalHistoryModel.findOne({ user: patientId });
//     if (!medicalHistory) {
//       return res.status(404).json({ message: "Medical history not found" });
//     }
//     res.json(medicalHistory);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// // Get a patient's vitals
// export const getVitals = async (req: Request, res: Response) => {
//   try {
//     const { _id: doctorId } = req.user; // extract the doctor ID from the JWT token in the request header
//     const { patientId } = req.params;
//     const doctor: IDoctor | null = await DoctorModel.findOne({
//       user: doctorId,
//     }); // find the doctor in the Doctor collection
//     if (!doctor) {
//       return res.status(404).json({ message: "Doctor not found" });
//     }
//     const vitals: IVital[] = await VitalsModel.find({ user: patientId });
//     res.json(vitals);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
