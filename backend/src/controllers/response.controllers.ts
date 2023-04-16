// responseByChat
import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/UserModel";
import jwt from "jsonwebtoken";
import Doctor, { IDoctor } from "../models/DoctorModel";
import Patient, { IPatient } from "../models/PatientModel";

export const responseByChat = async (req: Request, response: Response) => {
  try {
    // const { prompt } = req.body;
    // const response = await OpenAI.("completion", {
    //     model: "text-davinci-003",
    //     prompt: (symptoms,medicalhistory),
    //     tempreture: 0.9,
    //     max_tokens: 1000,
    //     n:1
    // });
  } catch (error: any) {
    response.status(500).json({ message: error });
  }
};
