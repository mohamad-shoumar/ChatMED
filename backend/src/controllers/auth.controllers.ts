import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/UserModel";
import jwt from "jsonwebtoken";

const saltRounds = 10;

//  Login
export const login = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid Credentials" });
    const checkpassowrd = await bcrypt.compare(password, user.password);
    if (!checkpassowrd)
      return res.status(400).json({ message: "invalid credintails" });
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.Secret_key
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
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("patient", "doctor").required(),
    fullName: Joi.string().min(3).max(50).required(),
    gender: Joi.string().valid("male", "female", "other").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  console.log(req.body);

  const { email, username, password, role, fullName, gender } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    const user: IUser = new User({
      email,
      username,
      password: hashedPassword,
      role,
      fullName,
      gender,
    });

    await user.save();
    return res.status(201).json({ message: "Success", user });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

// apis
// post add medical history
// get medical history
// post edit medical history
// get patient profile
// get list of doctors
// get advice of day(response.advice model)
// post choose doctor and enter sympotoms (response model)
// get response by doctor
// post edit profile
// post enter vitals
// get vitals(graph and chart)

// doctor api
// get list of patients
// get list of consultations
// get profile
// post edit doctor profile
// get response
// post edit reponse
// post submit response( turn state to complete)
