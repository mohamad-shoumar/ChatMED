import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { patientMiddleware } from "../middlewares/patient.middleware";
import { doctorMiddleware } from "../middlewares/doctor.middleware";
import { analyzeByChat } from "../controllers/analyze.controllers";

router.get("/", authMiddleware, analyzeByChat);

export default router;
