import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { patientMiddleware } from "../middlewares/patient.middleware";
import {
  editProfile,
  getDoctors,
  getProfile,
} from "../controllers/patient.controllers";

router.get("/getdoctors", authMiddleware, patientMiddleware, getDoctors);
router.get("/profile", authMiddleware, patientMiddleware, getProfile);
router.post("/editProfile", authMiddleware, patientMiddleware, editProfile);

export default router;
