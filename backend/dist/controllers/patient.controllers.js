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
exports.getProfile = exports.editProfile = exports.getDoctors = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
// Get all doctors
const getDoctors = (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield UserModel_1.default.find({ role: "doctor" });
        response.json(doctors);
    }
    catch (error) {
        response.status(500).json({ message: "Server error" });
    }
});
exports.getDoctors = getDoctors;
// edit profile
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body.user;
        const { fullName, email, picture } = req.body;
        const retrievedUser = yield UserModel_1.default.findById(id);
        if (!retrievedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        retrievedUser.fullName = fullName || retrievedUser.fullName;
        retrievedUser.email = email || retrievedUser.email;
        retrievedUser.picture = picture || retrievedUser.picture;
        const updatedUser = yield retrievedUser.save();
        res.json(updatedUser);
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
        const user = req.body.user;
        console.log(user);
        const retreiveduser = yield UserModel_1.default.findOne({ email: user.email });
        console.log(retreiveduser);
        if (!retreiveduser) {
            response.status(404).json({ message: "User not found" });
            return;
        }
        response.json(retreiveduser);
    }
    catch (error) {
        response.status(500).json({ message: "Server error" });
    }
});
exports.getProfile = getProfile;
