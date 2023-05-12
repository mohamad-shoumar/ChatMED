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
    const patientId = req.body.user.id;
    const vitalspatient = await Vital.findOne({
      user: patientId,
    });

    const response: any = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(vitalspatient),
      temperature: 0.7,
      n: 1,
    });

    const responseData = response.data.choices[0].text.replace(/^\s+/, "");

    if (!responseData) {
      throw new Error("No response text found.");
    }

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
      
        example: Your blood pressure is high, you should eat less salt and exercise more.
        ------------------------------
        Given the above information,
          the patient has the following vitals: ${vitalspatient}.
          Analyze the blood sugar values and provide a 15 words analyis,then give the patient a warning, motivation or nuetral statemnet based on the analysis. the analysis should be in the form of talking directley to the patient.It must also be smart and not sound like a generic advice.
          Don't mention talking to a doctor or a nurse.
`;
};
