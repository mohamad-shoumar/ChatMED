// responseByChat
import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import Patient from "../models/PatientModel";
import Analyze from "../models/AnalyzeModel";
import Vital from "../models/VitalModel";
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export const analyzeByChat = async (req: Request, res: Response) => {
  try {
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
    console.log(response.data);

    const responseText = response.data.choices[0].text?.trim();
    if (!responseText) {
      throw new Error("No response text found.");
    }
    const responseData = JSON.parse(response.data.choices[0].text.trim());
    console.log(responseData);

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
    console.log(error);
  }
};
