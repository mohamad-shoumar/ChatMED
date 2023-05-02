import { Request, Response } from "express";
import User, { IUser } from "../models/UserModel";
import Patient, { IPatient } from "../models/PatientModel";
import Doctor, { IDoctor } from "../models/DoctorModel";
import MedicalHistory, { IMedicalHistory } from "../models/MedicalHistoryModel";
import jwt from "jsonwebtoken";
import moment from "moment";
import multer from "multer";
import path from "path";

// Get all doctors
export const getDoctors = async (req: Request, response: Response) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    response.json(doctors);
  } catch (error) {
    response.status(500).json({ message: "Server error" });
  }
};
// uplaod file
export const uploadFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.user;
    const { imageUrl } = req.body;
    const retreiveduser = await User.findById(id);
    if (!retreiveduser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (retreiveduser) {
      retreiveduser.imageUrl = imageUrl || retreiveduser.imageUrl;
      const updatedUser = await retreiveduser.save();
      res.json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// get file
export const getFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.user;
    const retrievedFile = await User.findById(id);
    if (!retrievedFile) {
      return res.status(404).json({ message: "File not found" });
    }
    res.json(retrievedFile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// edit profile
export const editProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.user;
    const { fullName, email, imageUrls } = req.body;
    const retrievedUser = await User.findById(id);

    console.log("controller: ", req.body);

    if (!retrievedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (retrievedUser) {
      retrievedUser.fullName = fullName || retrievedUser.fullName;
      retrievedUser.email = email || retrievedUser.email;
      // retrievedUser.link = link || retrievedUser.link;

      // if (req.file) {
      //   retrievedUser.profilePictureUrl = req.file.path;
      // }
      const updatedUser = await retrievedUser.save();

      res.json(updatedUser);
    }
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
// chooseDoctor
export const chooseDoctor = async (req: Request, response: Response) => {
  const id = req.body.user.id;
  const doctorEmail = req.body.email;
  console.log(id);
  console.log(doctorEmail);
  try {
    const patient = await Patient.findOne({ user: id });
    const doctor = await User.findOne({ email: doctorEmail });
    let doctorId = doctor?._id;
    console.log(doctorId);

    if (!patient) {
      response.status(404).json({ message: "Patient not found" });
      return;
    }
    if (!doctor) {
      response.status(404).json({ message: "Doctor not found" });
      return;
    }
    let docList: any = {};
    docList = await Doctor.findOne({ user: doctorId }, { patients: 1 });
    if (!docList) {
      docList = new Doctor({ user: doctorId, patients: [id] });
      await docList.save();
    } else {
      docList = await Doctor.findOneAndUpdate(
        { user: doctorId },
        { $push: { patients: id } },
        { new: true }
      );
      await docList.save();
    }
    response.json(docList);
  } catch (error) {
    response.status(500).json({ message: error });
  }
};

// GEt response, if response found change the pending status to either chat or success
