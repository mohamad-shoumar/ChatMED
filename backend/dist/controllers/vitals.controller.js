"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeartRate = exports.addHeartRate = exports.getSugar = exports.addSugar = exports.getBloodPressure = exports.addBloodPressure = void 0;
const VitalModel_1 = __importDefault(require("../models/VitalModel"));
// add bloodpressure api
const addBloodPressure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = req.body.value;
        const userId = req.body.user.id;
        let vital = yield VitalModel_1.default.findOne({ user: userId });
        if (!vital) {
            vital = new VitalModel_1.default({ user: userId, bloodPressure: [{ value }] });
        }
        else {
            if (!vital.bloodPressure) {
                vital.bloodPressure = [{ value }];
                console.log(vital.bloodPressure);
            }
            else {
                vital.bloodPressure.push({ value });
            }
        }
        yield vital.save();
        res.json(vital);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.addBloodPressure = addBloodPressure;
// get bloodpressure api
const getBloodPressure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.id;
        const retrievedBloodPressure = yield VitalModel_1.default.findOne({ user: userId }, { bloodPressure: 1 });
        if (!retrievedBloodPressure) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(retrievedBloodPressure.bloodPressure);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.getBloodPressure = getBloodPressure;
// add sugar api
const addSugar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = req.body.value;
        const userId = req.body.user.id;
        if (!value || !userId) {
            return res.status(400).json({ message: "Invalid input data" });
        }
        let vitals = yield VitalModel_1.default.findOne({ user: userId });
        if (!vitals) {
            vitals = yield new VitalModel_1.default({ user: userId });
        }
        else {
            if (!vitals.bloodsugar) {
                vitals.bloodsugar = [{ value }];
            }
            else {
                vitals.bloodsugar.push({ value });
            }
        }
        yield vitals.save();
        res.json(vitals);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.addSugar = addSugar;
// get sugar api
const getSugar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.id;
        const retrievedBloodSugar = yield VitalModel_1.default.findOne({ user: userId }, { bloodsugar: 1 });
        res.json(retrievedBloodSugar);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.getSugar = getSugar;
// heart  rate api
const addHeartRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = req.body.value;
        const userId = req.body.user.id;
        if (!value || !userId) {
            return res.status(400).json({ message: "Invalid input data" });
        }
        let vital_hr = yield VitalModel_1.default.findOne({ user: userId });
        if (!vital_hr) {
            vital_hr = new VitalModel_1.default({ user: userId, heartRate: [{ value }] });
        }
        else {
            if (!vital_hr.heartRate) {
                vital_hr.heartRate = [{ value }];
            }
            else {
                vital_hr.heartRate.push({ value });
            }
        }
        yield vital_hr.save();
        res.json(vital_hr);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.addHeartRate = addHeartRate;
// get heart rate api
const getHeartRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.id;
        const retrievedHeartRate = yield VitalModel_1.default.findOne({ user: userId }, { heartRate: 1 });
        res.json(retrievedHeartRate);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.getHeartRate = getHeartRate;
