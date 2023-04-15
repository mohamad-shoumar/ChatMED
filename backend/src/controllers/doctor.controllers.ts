import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Doctor, { IDoctor } from "../models/DoctorModel";
import UserModel, { IUser } from "../models/UserModel";
import MedicalHistoryModel, {
  IMedicalHistory,
} from "../models/MedicalHistoryModel";
import Vitals, { IVital } from "../models/VitalModel";

// Get a list of all the patients assigned to the current doctor
// GET /patients
// export const getpatients =  async (req:Request, res:Response) => {
//   try {
//     // Get the current doctor's ID from the request
//     const doctorId = req.user._id;

//     // Find the doctor in the database
//     const doctor = await Doctor.findById(doctorId).populate("patients");

//     if (!doctor) {
//       // Return an error if the doctor is not found
//       return res.status(404).json({ error: "Doctor not found" });
//     }

//     // Return the list of patients assigned to the doctor
//     res.json(doctor.patients);
//   } catch (err) {
//     // Handle any errors that occur
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
