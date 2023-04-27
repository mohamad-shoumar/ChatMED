import { Router } from "express";
import mutler from "multer";
const router: Router = Router();
import { uploadFile } from "../controllers/patient.controllers";

router.post("/upload", mutler, uploadFile);

export default router;
