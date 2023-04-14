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
exports.updateMedicalHistory = exports.getMedicalHistory = exports.addMedicalHistory = void 0;
const MedicalHistoryModel_1 = __importDefault(require("../models/MedicalHistoryModel"));
// craate new medical history
const addMedicalHistory = (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, medicalHistory } = req.body;
        const newMedicalHistory = new MedicalHistoryModel_1.default({
            user: user.id,
            height: medicalHistory.height,
            weight: medicalHistory.weight,
            allergies: medicalHistory.allergies,
            medications: medicalHistory.medications,
            surgeries: medicalHistory.surgeries,
            chronicConditions: medicalHistory.chronicConditions,
        });
        console.log(newMedicalHistory);
        yield newMedicalHistory.save();
        response.json({ message: "medical history added", newMedicalHistory });
    }
    catch (error) {
        response.status(500).json({ message: "Server error" });
    }
});
exports.addMedicalHistory = addMedicalHistory;
// Get  medical history for a user
const getMedicalHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.id;
        const medicalHistory = yield MedicalHistoryModel_1.default.findOne({ user: userId });
        if (!medicalHistory) {
            return res.status(404).json({ message: "Medical history not found" });
        }
        return res.json({ medicalHistory });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getMedicalHistory = getMedicalHistory;
// Update a medical history
const updateMedicalHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.id;
        const medicalHistory = yield MedicalHistoryModel_1.default.findOneAndUpdate({ user: userId }, { $set: req.body }, { new: true, upsert: true });
        return res.json({ medicalHistory });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateMedicalHistory = updateMedicalHistory;
