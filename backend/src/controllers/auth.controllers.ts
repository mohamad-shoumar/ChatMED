import { Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/UserModel";
import jwt from "jsonwebtoken";
import Doctor, { IDoctor } from "../models/DoctorModel";
import Patient, { IPatient } from "../models/PatientModel";

const saltRounds = 10;

//  Login
export const login = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const secretKey: Secret = process.env.Secret_key as string;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid Credentials" });
    const checkpassowrd = await bcrypt.compare(password, user.password);
    if (!checkpassowrd)
      return res.status(400).json({ message: "invalid credintails" });
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      secretKey
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// Register

export const register = async (req: Request, res: Response) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("patient", "doctor").required(),
    displayName: Joi.string().min(3).max(50).required(),
    imageUrl: Joi.string().optional(),
    file: Joi.any().optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { email, password, role, displayName, imageUrl } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const user: IUser = new User({
      displayName,
      email,
      imageUrl,
      password: hashedPassword,
      role,
    });

    await user.save();

    if (role === "doctor") {
      const doctor = new Doctor({
        user: user.id,
      });
      await doctor.save();
    } else if (role === "patient") {
      const patient = new Patient({
        user: user.id,
      });
      await patient.save();
    }

    return res.status(201).json({ message: "Success", user });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
