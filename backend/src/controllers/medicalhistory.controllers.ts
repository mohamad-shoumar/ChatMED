import { Request, Response } from "express";
import MedicalHistory, { IMedicalHistory } from "../models/MedicalHistoryModel";

// craate new medical history
export const addMedicalHistory = async (req: Request, response: Response) => {
  try {
    const { user, medicalHistory } = req.body;
    const newMedicalHistory: IMedicalHistory = new MedicalHistory({
      user: user.id,
      height: medicalHistory.height,
      weight: medicalHistory.weight,
      allergies: medicalHistory.allergies,
      medications: medicalHistory.medications,
      surgeries: medicalHistory.surgeries,
      chronicConditions: medicalHistory.chronicConditions,
      dateOfBirth: medicalHistory.dateOfBirth,
    });
    console.log(newMedicalHistory);

    await newMedicalHistory.save();
    response.json({ message: "medical history added", newMedicalHistory });
  } catch (error) {
    response.status(500).json({ message: "Server error" });
  }
};

// Get  medical history for a user
export const getMedicalHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const medicalHistory = await MedicalHistory.findOne({ user: userId });
    if (!medicalHistory) {
      return res.status(404).json({ message: "Medical history not found" });
    }
    return res.json({ medicalHistory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
