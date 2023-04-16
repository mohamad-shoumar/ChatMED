"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_middleware_1 = require("../middlewares/auth.middleware");
const patient_middleware_1 = require("../middlewares/patient.middleware");
const patient_controllers_1 = require("../controllers/patient.controllers");
router.get("/getdoctors", auth_middleware_1.authMiddleware, patient_middleware_1.patientMiddleware, patient_controllers_1.getDoctors);
router.get("/profile", auth_middleware_1.authMiddleware, patient_middleware_1.patientMiddleware, patient_controllers_1.getProfile);
router.post("/editProfile", auth_middleware_1.authMiddleware, patient_middleware_1.patientMiddleware, patient_controllers_1.editProfile);
router.post("/choosedoctor", auth_middleware_1.authMiddleware, patient_middleware_1.patientMiddleware, patient_controllers_1.chooseDoctor);
exports.default = router;
