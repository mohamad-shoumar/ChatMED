import { Request, Response } from "express";
import User, { IUser } from "../models/UserModel";
import MedicalHistory, { IMedicalHistory } from "../models/MedicalHistoryModel";
import jwt from "jsonwebtoken";
import moment from "moment";

// Get all doctors
export const getDoctors = async (req: Request, response: Response) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    response.json(doctors);
  } catch (error) {
    response.status(500).json({ message: "Server error" });
  }
};

// edit profile
export const editProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.user;
    const { fullName, email, picture } = req.body;

    const retrievedUser = await User.findById(id);

    if (!retrievedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    retrievedUser.fullName = fullName || retrievedUser.fullName;
    retrievedUser.email = email || retrievedUser.email;
    retrievedUser.picture = picture || retrievedUser.picture;
    const updatedUser = await retrievedUser.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get profile
export const getProfile = async (req: Request, response: Response) => {
  try {
    const user = req.body.user;
    console.log(user);

    const retreiveduser = await User.findOne({ email: user.email });
    console.log(retreiveduser);

    if (!retreiveduser) {
      response.status(404).json({ message: "User not found" });
      return;
    }
    response.json(retreiveduser);
  } catch (error) {
    response.status(500).json({ message: "Server error" });
  }
};
