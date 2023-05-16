import { Request, Response } from "express";
import Vitals, { IVital } from "../models/VitalModel";
import Patient, { IPatient } from "../models/PatientModel";
import User, { IUser } from "../models/UserModel";
import { log } from "console";

// add bloodpressure api

export const addBloodPressure = async (req: Request, res: Response) => {
  try {
    const value = req.body.value;
    const userId = req.body.user.id;
    if (!value || !userId) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    let vitals = await Vitals.findOne({ user: userId });

    if (!vitals) {
      vitals = new Vitals({ user: userId });
    } else {
      if (!vitals.bloodPressure) {
        vitals.bloodPressure = [{ value }];
      } else {
        vitals.bloodPressure.push({ value });
      }
    }
    await vitals.save();

    res.json(vitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
// add sugar api
export const addSugar = async (req: Request, res: Response) => {
  try {
    const value = req.body.value;
    const userId = req.body.user.id;
    if (!value || !userId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    let vitals = await Vitals.findOne({ user: userId });
    if (!vitals) {
      vitals = new Vitals({ user: userId });
    } else {
      if (!vitals.bloodsugar) {
        vitals.bloodsugar = [{ value }];
      } else {
        vitals.bloodsugar.push({ value });
      }
    }
    await vitals.save();
    res.json(vitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
// get bloodpressure api
export const getBloodPressure = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const retrievedBloodPressure = await Vitals.findOne(
      { user: userId },
      { bloodPressure: 1 }
    );
    if (!retrievedBloodPressure) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(retrievedBloodPressure);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// get sugar api
export const getSugar = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const retrievedBloodSugar = await Vitals.findOne(
      { user: userId },
      { bloodsugar: 1 }
    );

    res.json(retrievedBloodSugar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
