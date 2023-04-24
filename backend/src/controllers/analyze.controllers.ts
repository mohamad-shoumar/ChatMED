// responseByChat
import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import Patient from "../models/PatientModel";
import Analyze from "../models/AnalyzeModel";
import Vital from "../models/VitalModel";

export const analyzeByChat = async (req: Request, res: Response) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    console.log(process.env);
    const patientId = req.body.user.id;
    const vitalspatient = await Vital.findOne({
      user: patientId,
    });
    const response: any = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(vitalspatient),
      temperature: 0.7,
      max_tokens: 1000,
      n: 1,
    });

    const responseText = response.data.choices[0].text?.trim();
    if (!responseText) {
      throw new Error("No response text found.");
    }
    const responseData = JSON.parse(response.data.choices[0].text.trim());

    const analyzeModel = new Analyze({
      analysis: JSON.stringify(responseData),
      user: patientId,
    });

    await analyzeModel.save();
    return res.status(200).json({
      message: "success",
      data: responseData,
    });
  } catch (error: any) {
    "error" || "Something went wrong";
  }
};
const generatePrompt = (vitalspatient: any) => {
  return `
        Context information is below.
        ------------------------------
        vitals: ${vitalspatient}
        analyze: analyze
        ------------------------------
        Given the above information,
          patient x has the following vitals data set: ${vitalspatient}.
         Analyze this data of the vitals and provide a 15 words warning, motivation or nuetral statemnet depending on the data. 
         Reurtn only a JSON parsable object with the following schema (Do not include any explanation before or after the JSON object):
         const Schema = mongoose.Schema;
         const AnalyzeSchema = new mongoose.Schema({
          user: {
            type: Schema.Types.ObjectId,
            ref: "Patient",
          },
          analysis: {
            type: String,
          },
        });`;
};
