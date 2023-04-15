import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { patientMiddleware } from "../middlewares/patient.middleware";
import {
  addBloodPressure,
  getBloodPressure,
  addSugar,
  addHeartRate,
  getHeartRate,
  getSugar,
} from "../controllers/vitals.controller";

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

router.post("/sugar", authMiddleware, patientMiddleware, addSugar);
router.get("/sugar", authMiddleware, patientMiddleware, getSugar);

router.post("/heart", authMiddleware, patientMiddleware, addHeartRate);
router.get("/heart", authMiddleware, patientMiddleware, getHeartRate);

export default router;
