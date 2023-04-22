import express, { Application, ErrorRequestHandler } from "express";
import cors from "cors";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes";
import patientRoutes from "./routes/patient.routes";
import vitalsRoutes from "./routes/vitals.routes";
import doctorRoutes from "./routes/doctor.routes";
import medicalHistoryRoutes from "./routes/medicalhistory.routes";
import responseRoutes from "./routes/response.routes";
import analyzeRoutes from "./routes/analyze.routes";
import adviceRoutes from "./routes/advice.routes";
import { Configuration, OpenAIApi } from "openai";

import connectDB from "./configs/db.config";

config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(new Configuration());
const app: Application = express();
const port = process.env.PORTAL;
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  connectDB();
});

app.use("/auth", authRoutes);
app.use("/patient", patientRoutes);
app.use("/doctor", doctorRoutes);
app.use("/medicalhistory", medicalHistoryRoutes);
app.use("/vitals", vitalsRoutes);
app.use("/response", responseRoutes);
app.use("/advice", adviceRoutes);
app.use("/analyze", analyzeRoutes);
