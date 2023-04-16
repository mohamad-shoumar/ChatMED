import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { patientMiddleware } from "../middlewares/patient.middleware";
import {
  getMedicalHistory,
  addMedicalHistory,
  updateMedicalHistory,
} from "../controllers/medicalhistory.controllers";

router.get("/myhistory", authMiddleware, getMedicalHistory);

router.post(
  "/addhistory",
  authMiddleware,
  patientMiddleware,
  addMedicalHistory
);

router.post(
  "/updatehistory",
  authMiddleware,
  patientMiddleware,
  updateMedicalHistory
);

export default router;
