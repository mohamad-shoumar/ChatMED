"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const patient_routes_1 = __importDefault(require("./routes/patient.routes"));
// import doctorRoutes from "./routes/doctor.routes";
const medicalhistory_routes_1 = __importDefault(require("./routes/medicalhistory.routes"));
const db_config_1 = __importDefault(require("./configs/db.config"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = process.env.PORTAL;
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    (0, db_config_1.default)();
});
app.use("/auth", auth_routes_1.default);
app.use("/patient", patient_routes_1.default);
// app.use("/doctor", doctorRoutes);
app.use("/medicalhistory", medicalhistory_routes_1.default);
