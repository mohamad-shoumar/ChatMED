import { Router } from "express";
const router: Router = Router();
import { authMiddleware } from "../middlewares/auth.middleware";
import { doctorMiddleware } from "../middlewares/doctor.middleware";

import { editProfile, getProfile } from "../controllers/doctor.controllers";

router.post("/editprofile", authMiddleware, doctorMiddleware, editProfile);
router.get("/getprofile", authMiddleware, doctorMiddleware, getProfile);

export default router;
