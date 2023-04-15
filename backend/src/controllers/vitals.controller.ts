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
    const retrievedBloodPressure = await Vitals.findOne(
      { user: userId },
      { bloodPressure: 1 }
    );
    if (!retrievedBloodPressure) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(retrievedBloodPressure.bloodPressure);
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
      vitals = await new Vitals({ user: userId });
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
// heart  rate api
export const addHeartRate = async (req: Request, res: Response) => {
  try {
    const value = req.body.value;
    const userId = req.body.user.id;
    if (!value || !userId) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    let vital_hr = await Vitals.findOne({ user: userId });
    if (!vital_hr) {
      vital_hr = new Vitals({ user: userId, heartRate: [{ value }] });
    } else {
      if (!vital_hr.heartRate) {
        vital_hr.heartRate = [{ value }];
      } else {
        vital_hr.heartRate.push({ value });
      }
    }
    await vital_hr.save();
    res.json(vital_hr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
// get heart rate api
export const getHeartRate = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const retrievedHeartRate = await Vitals.findOne(
      { user: userId },
      { heartRate: 1 }
    );
    res.json(retrievedHeartRate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
