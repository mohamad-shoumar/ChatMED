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
exports.editProfile = void 0;
const DoctorModel_1 = __importDefault(require("../models/DoctorModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
// GET /patients
// export const getpatients =  async (req:Request, res:Response) => {
//   try {
//     // Get the current doctor's ID from the request
//     const doctorId = req.user._id;
//     // Find the doctor in the database
//     const doctor = await Doctor.findById(doctorId).populate("patients");
//     if (!doctor) {
//       // Return an error if the doctor is not found
//       return res.status(404).json({ error: "Doctor not found" });
//     }
//     // Return the list of patients assigned to the doctor
//     res.json(doctor.patients);
//   } catch (err) {
//     // Handle any errors that occur
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
// // get list of patients
// get list of consultations
// get profile
// post edit doctor profile
// get response
// post edit response
// post submit response( turn state to complete)
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
        res.json({ updatedDoctor });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.editProfile = editProfile;
