"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_middleware_1 = require("../middlewares/auth.middleware");
const doctor_middleware_1 = require("../middlewares/doctor.middleware");
const doctor_controllers_1 = require("../controllers/doctor.controllers");
router.post("/editProfile", auth_middleware_1.authMiddleware, doctor_middleware_1.doctorMiddleware, doctor_controllers_1.editProfile);
exports.default = router;
