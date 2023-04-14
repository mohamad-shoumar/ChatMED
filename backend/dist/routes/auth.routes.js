"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = require("../controllers/auth.controllers");
const router = (0, express_1.Router)();
router.post("/login", auth_controllers_1.login);
router.post("/register", auth_controllers_1.register);
exports.default = router;
