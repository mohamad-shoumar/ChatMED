// responseByChat
import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import Patient from "../models/PatientModel";
import MedicalHistory from "../models/MedicalHistoryModel";
import ResponseModel from "../models/ResponseModel";
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export const responseByChat = async (req: Request, res: Response) => {
  try {
    const patientId = req.body.user.id;
    const doctorId = req.body.doctor;
    const retrievedMedicalhistory = await MedicalHistory.findOne({
      user: patientId,
    });
    const symptoms = req.body.symptoms;
    console.log(doctorId);

    const response: any = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(symptoms, retrievedMedicalhistory),
      temperature: 0.7,
      max_tokens: 1000,
      n: 1,
    });
    const responseData = JSON.parse(response.data.choices[0].text.trim());
    const responseModel = new ResponseModel({
      patient: patientId,
      doctor: doctorId,
      symptoms: symptoms,
      diagnosis: responseData.diagnosis,
      treatmentPlan: responseData.treatmentPlan,
      status: "pending",
    });

    await responseModel.save();
    return res.status(200).json({
      message: "success",
      data: responseData,
    });
  } catch (error: any) {
    console.log(error);
  }
};
const generatePrompt = (symptoms: string, retrievedMedicalhistory: any) => {
  return `
  Context information is below.
  ------------------------------
  medical history: ${retrievedMedicalhistory}
  symptoms: ${symptoms}

  diagnosis: diagnosis
  treatmentPlan: treatmentPlan
  ------------------------------
  Given the above information,
    patient x has the following medical history: ${retrievedMedicalhistory}, his/her symptoms are: ${symptoms}.
   your response to this case will be checked by a medical professional, provide a diagnosis and treatment plan and
    the response shall be sent to a physician which will check it and either confirm, edit or suggest a physical appoitment.
   make your response as if a medical doctor is writing it, suggest a diagnosis and a treatmentPlan.
   Reurtn only a JSON parsable object with the following schema (Do not include any explanation before or after the JSON object):
   const ResponseSchema = mongoose.Schema({
    diagnosis: {
      type: String,
      required: true,
    },
    treatmentPlan: {
      type: String, //you are allowed to prescribe a medication with a frequency and duration
      required: true,
    },
})`;
};
