import { Request, Response } from "express";
import MedicalHistory, { IMedicalHistory } from "../models/MedicalHistoryModel";

// craate new medical history
export const addMedicalHistory = async (req: Request, response: Response) => {
  try {
    const userId = req.body.user.id;
    const medicalHistory = req.body.medicalHistory;
    console.log(medicalHistory);

    let newMedicalHistory = await MedicalHistory.findOne({ user: userId });
    if (newMedicalHistory) {
      return response
        .status(400)
        .json({ message: "Medical history already exists" });
    } else if (!newMedicalHistory) {
      newMedicalHistory = new MedicalHistory({
        user: userId,
        height: medicalHistory.height,
        weight: medicalHistory.weight,
        allergies: medicalHistory.allergies,
        medications: medicalHistory.medications,
        surgeries: medicalHistory.surgeries,
        chronicConditions: medicalHistory.chronicConditions,
        dateOfBirth: medicalHistory.dateOfBirth,
        gender: medicalHistory.gender,
      });
      console.log(newMedicalHistory);
      await newMedicalHistory.save();
      response.json({ message: "medical history added", newMedicalHistory });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error });
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
// Update a medical history
export const updateMedicalHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const {
      height,
      weight,
      allergies,
      medications,
      surgeries,
      chronicConditions,
      dateOfBirth,
    } = req.body.medicalHistory;

    const updatedMedicalHistory = await MedicalHistory.findOneAndUpdate(
      { user: userId },
      {
        height,
        weight,
        allergies,
        medications,
        surgeries,
        chronicConditions,
        dateOfBirth,
      },
      { new: true }
    );

    res.status(200).json({ updatedMedicalHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
