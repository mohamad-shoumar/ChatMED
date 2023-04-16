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
const vitals_routes_1 = __importDefault(require("./routes/vitals.routes"));
const doctor_routes_1 = __importDefault(require("./routes/doctor.routes"));
const medicalhistory_routes_1 = __importDefault(require("./routes/medicalhistory.routes"));
// import responseRoutes from "./routes/response.routes";
const openai_1 = require("openai");
const db_config_1 = __importDefault(require("./configs/db.config"));
(0, dotenv_1.config)();
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(new openai_1.Configuration());
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
app.use("/doctor", doctor_routes_1.default);
app.use("/medicalhistory", medicalhistory_routes_1.default);
app.use("/vitals", vitals_routes_1.default);
// app.use("/openai", responseRoutes);
