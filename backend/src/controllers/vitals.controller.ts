import { Request, Response } from "express";
import Vitals, { IVital } from "../models/VitalModel";
import User, { IUser } from "../models/UserModel";

// add vital
export const addVitals = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  const medicalData = req.body.medicalData;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(medicalData);
    const newVital: IVital = new Vitals({
      user: userId,
      medicalData,
    });
    await newVital.save();
    res.status(201).json({ message: "Vital data added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
// get vitals
export const getVitals = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  try {
    const vital: IVital | null = await Vitals.findOne({ user: userId });
    res.status(200).json({ vital });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
