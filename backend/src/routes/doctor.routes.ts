import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { doctorMiddleware } from "../middlewares/doctor.middleware";

import {
  editProfile,
  getProfile,
  getPatients,
  getMedicalHistory,
} from "../controllers/doctor.controllers";

router.post("/editprofile", authMiddleware, doctorMiddleware, editProfile);
router.post("/gethistory", authMiddleware, doctorMiddleware, getMedicalHistory);
router.get("/getprofile", authMiddleware, doctorMiddleware, getProfile);
router.get("/getpatients", authMiddleware, doctorMiddleware, getPatients);

export default router;
