import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { patientMiddleware } from "../middlewares/patient.middleware";
import { doctorMiddleware } from "../middlewares/doctor.middleware";
import { adviceByChat } from "../controllers/advice.controllers";

router.post("/", authMiddleware, adviceByChat);

export default router;
