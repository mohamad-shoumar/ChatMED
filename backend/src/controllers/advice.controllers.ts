import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import MedicalHistory from "../models/MedicalHistoryModel";
import Advice from "../models/AdviceModel";

export const adviceByChat = async (req: Request, res: Response) => {
  try {
    const x = process.env.OPEN_AI_KEY;
    const configuration = new Configuration({
      apiKey: x,
    });
    const openai = new OpenAIApi(configuration);
    console.log(x);
    console.log(process.env.OPEN_AI_KEY);

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
    console.log(response.data);

    const responseText = response.data.choices[0].text?.trim();
    if (!responseText) {
      throw new Error("No response text found.");
    }
    const responseData = JSON.parse(response.data.choices[0].text.trim());
    console.log(responseData);

    const adviceModel = new Advice({
      advice: JSON.stringify(responseData),
      medicalHistory: retrievedMedicalhistory,
      user: patientId,
    });

    await adviceModel.save();
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
          patient x has the following medical history: ${retrievedMedicalhistory}.
         provide a personalized advice for the patient, the advice should be related to the medical history of the patient, it must be between 20 and 50 words.
         Reurtn only a JSON parsable object with the following schema (Do not include any explanation before or after the JSON object):
         const Schema = mongoose.Schema;
const AdviceSchema = new Schema({user:{type: Schema.Types.ObjectId,ref:"User",},medicalHistory: {type: Schema.Types.ObjectId,ref: "MedicalHistory",
  },
  advice: {
    type: String,
    required: true,
  },
});`;
};
