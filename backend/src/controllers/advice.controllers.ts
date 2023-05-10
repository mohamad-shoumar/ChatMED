import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import MedicalHistory from "../models/MedicalHistoryModel";
import { log } from "console";
import Advice from "../models/AdviceModel";

export const adviceByChat = async (req: Request, res: Response) => {
  try {
    const x = process.env.OPEN_AI_KEY;
    const configuration = new Configuration({
      apiKey: x,
    });
    const openai = new OpenAIApi(configuration);

    const patientId = req.body.user.id;
    const retrievedMedicalhistory = await MedicalHistory.findOne({
      user: patientId,
    });
    const response: any = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(retrievedMedicalhistory),
      temperature: 0.7,
      max_tokens: 1000,
      n: 1,
    });

    const responseData = response.data.choices[0].text.replace(/^\s+/, "");

    return res.status(200).json({
      message: "success",
      data: responseData,
    });
  } catch (error: any) {
    console.log(error);
  }
};

const generatePrompt = (retrievedMedicalhistory: any) => {
  return `
        Context information is below.
        ------------------------------
        medical history: ${retrievedMedicalhistory}
        advice: advice
        ------------------------------
        Given the above information,
          the patient has the following medical history: ${retrievedMedicalhistory}.
         provide a personalized advice for the patient, the advice should be related to the medical history of the patient, it must be between 20 and 50 words and be in the form of talking directley to the patient.It must also be smart and not sound like a generic advice.
        `;
};
