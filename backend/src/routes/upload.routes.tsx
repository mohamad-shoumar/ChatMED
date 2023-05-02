import { Router } from "express";
import mutler from "multer";
const router: Router = Router();
import { uploadFile, getFile } from "../controllers/patient.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

router.post("/upload", authMiddleware, uploadFile);
router.get("/upload", authMiddleware, getFile);

export default router;
