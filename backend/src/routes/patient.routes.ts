import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { patientMiddleware } from "../middlewares/patient.middleware";
import {
  editProfile,
  getDoctors,
  getProfile,
  chooseDoctor,
} from "../controllers/patient.controllers";

router.get("/getdoctors", authMiddleware, patientMiddleware, getDoctors);
router.get("/profile", authMiddleware, patientMiddleware, getProfile);
router.post(
  "/editProfile",
  (req) => console.log("route: ", req.body),
  authMiddleware,
  patientMiddleware,
  editProfile
);
router.post("/choosedoctor", authMiddleware, patientMiddleware, chooseDoctor);

export default router;
