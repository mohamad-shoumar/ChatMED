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
exports.getMedicalHistory = exports.getPatients = exports.getProfile = exports.editProfile = void 0;
const DoctorModel_1 = __importDefault(require("../models/DoctorModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const MedicalHistoryModel_1 = __importDefault(require("../models/MedicalHistoryModel"));
// edit profile
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.user.id;
        const { fullName, price, workingHours, email, picture } = req.body;
        console.log(req.body);
        console.log(userId);
        console.log(workingHours);
        const doctor = yield DoctorModel_1.default.findOne({ user: userId });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        const typedDoctor = doctor;
        typedDoctor.price = price || typedDoctor.price;
        typedDoctor.workingHours = workingHours || typedDoctor.workingHours;
        const updatedDoctor = yield typedDoctor.save();
        const retrievedUser = yield UserModel_1.default.findOne({ _id: userId });
        if (!retrievedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        retrievedUser.fullName = fullName || retrievedUser.fullName;
        retrievedUser.email = email || retrievedUser.email;
        retrievedUser.picture = picture || retrievedUser.picture;
        const updatedUser = yield retrievedUser.save();
        res.json({ updatedDoctor, updatedUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.editProfile = editProfile;
// get profile
const getProfile = (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorInfo = req.body.user.id;
        const userInfo = req.body.user.id;
        const doctor = yield DoctorModel_1.default.findOne({ user: doctorInfo });
        const user = yield UserModel_1.default.findOne({ _id: userInfo });
        if (!doctor) {
            response.status(404).json({ message: "Doctor not found" });
            return;
        }
        if (!user) {
            response.status(404).json({ message: "User not found" });
            return;
        }
        response.json({ doctor, user });
    }
    catch (error) {
        response.status(500).json({ message: "Server error" });
    }
});
exports.getProfile = getProfile;
// getPatients
const getPatients = (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorId = req.body.user.id;
        const doctor = yield DoctorModel_1.default.findOne({ user: doctorId });
        console.log(doctor);
        if (!doctor) {
            response.status(404).json({ message: "Doctor not found" });
            return;
        }
        const patients = yield UserModel_1.default.find({ _id: { $in: doctor.patients } });
        response.json(patients);
    }
    catch (error) {
        response.status(500).json({ message: "Server error" });
    }
});
exports.getPatients = getPatients;
// GetpatientMedicalHistory
const getMedicalHistory = (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.body.patientId;
        const medicalHistory = yield MedicalHistoryModel_1.default.findOne({
            user: patientId,
        }).populate("user");
        if (!medicalHistory) {
            response.status(404).json({ message: "Medical history not found" });
            return;
        }
        response.json(medicalHistory);
    }
    catch (error) {
        response.status(500).json({ message: "Server error" });
    }
});
exports.getMedicalHistory = getMedicalHistory;
