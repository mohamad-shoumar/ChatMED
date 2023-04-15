import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { patientMiddleware } from "../middlewares/patient.middleware";
import {
  getVitals,
  addBloodPressure,
  getBloodPressure,
} from "../controllers/vitals.controller";

router.get("/", authMiddleware, getVitals);
router.post(
  "/bloodpressure",
  authMiddleware,
  patientMiddleware,
  addBloodPressure
);
router.get(
  "/bloodpressure",
  authMiddleware,
  patientMiddleware,
  getBloodPressure
);

export default router;
