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
exports.register = exports.login = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DoctorModel_1 = __importDefault(require("../models/DoctorModel"));
const PatientModel_1 = __importDefault(require("../models/PatientModel"));
const saltRounds = 10;
//  Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = yield UserModel_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Invalid Credentials" });
        const checkpassowrd = yield bcrypt_1.default.compare(password, user.password);
        if (!checkpassowrd)
            return res.status(400).json({ message: "invalid credintails" });
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, process.env.Secret_key);
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
});
exports.login = login;
// Register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        username: joi_1.default.string().alphanum().min(3).max(30).required(),
        password: joi_1.default.string().min(6).required(),
        role: joi_1.default.string().valid("patient", "doctor").required(),
        fullName: joi_1.default.string().min(3).max(50).required(),
        gender: joi_1.default.string().valid("male", "female", "other").required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    const { email, username, password, role, fullName, gender } = req.body;
    try {
        const existingUser = yield UserModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const user = new UserModel_1.default({
            email,
            username,
            password: hashedPassword,
            role,
            fullName,
            gender,
        });
        yield user.save();
        if (role === "doctor") {
            const doctor = new DoctorModel_1.default({
                doctor: user._id,
            });
            yield doctor.save();
        }
        else if (role === "patient") {
            const patient = new PatientModel_1.default({
                patient: user._id,
            });
            yield patient.save();
        }
        return res.status(201).json({ message: "Success", user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.register = register;
//
// apis
// post add medical history
// get medical history
// post edit medical history
// get patient profile
// get list of doctors
// get advice of day(response.advice model)
// post choose doctor and enter sympotoms (response model)
// get response by doctor
// post edit profile
// post enter vitals
// get vitals(graph and chart)
// doctor api
// get list of patients
// get list of consultations
// get profile
// post edit doctor profile
// get response
// post edit reponse
// post submit response( turn state to complete)
