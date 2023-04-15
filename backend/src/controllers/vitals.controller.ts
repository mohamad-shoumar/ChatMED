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

    let vital = await Vitals.findOne({ user: userId });

    if (!vital) {
      vital = new Vitals({ user: userId, bloodPressure: [{ value }] });
    } else {
      if (!vital.bloodPressure) {
        vital.bloodPressure = [{ value }];
        console.log(vital.bloodPressure);
      } else {
        vital.bloodPressure.push({ value });
      }
    }
    await vital.save();

    res.json(vital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
// get bloodpressure api
export const getBloodPressure = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const retrievedBloodPressure = await Vitals.findOne({ user: userId });

    res.json(retrievedBloodPressure);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// sugar api

// heart  rate api

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
