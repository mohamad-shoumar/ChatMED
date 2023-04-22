import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { patientMiddleware } from "../middlewares/patient.middleware";
import { doctorMiddleware } from "../middlewares/doctor.middleware";
import { responseByChat } from "../controllers/response.controllers";

router.post("/", authMiddleware, responseByChat);

export default router;
