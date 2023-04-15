import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { patientMiddleware } from "../middlewares/patient.middleware";
import {
  getMedicalHistory,
  addMedicalHistory,
  updateMedicalHistory,
} from "../controllers/medicalhistory.controllers";

router.get("/my-history", authMiddleware, getMedicalHistory);

router.post(
  "/addhistory",
  authMiddleware,
  patientMiddleware,
  addMedicalHistory
);

router.post(
  "/update-history",
  authMiddleware,
  patientMiddleware,
  updateMedicalHistory
);

export default router;
