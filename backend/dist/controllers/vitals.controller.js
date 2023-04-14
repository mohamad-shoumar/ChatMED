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
exports.createVital = void 0;
const VitalModel_1 = __importDefault(require("../models/VitalModel"));
const createVital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, date, bloodPressure, heartRate, bloodsugar } = req.body;
        const newVital = new VitalModel_1.default({
            user,
            date,
            bloodPressure,
            heartRate,
            bloodsugar,
        });
        yield newVital.save();
        res.status(201).json({ message: "Vital added successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createVital = createVital;
// add vitals
// export const addVitals = async (req: Request, response: Response) => {
//   try {
//     const { user } = req.body;
//     const retreiveduser = await User.findById(user._id);
//     if (!retreiveduser) {
//       response.status(404).json({ message: "User not found" });
//       return;
//     }
//     const { vitals } = req.body;
//     retreiveduser.vitals = vitals;
//     await retreiveduser.save();
//     response.json(retreiveduser);
//   } catch (error) {
//     response.status(500).json({ message: "Server error" });
//   }
// };
// // get vitals
// export const getVitals = async (req: Request, response: Response) => {
//   try {
//     const { id } = req.params;
//     const retreiveduser = await User.findById(id);
//     if (!retreiveduser) {
//       response.status(404).json({ message: "User not found" });
//       return;
//     }
//     const vitals = retreiveduser.vitals;
//     if (!vitals)
//       return response.status(404).json({ message: "Vitals not found" });
//     response.json(vitals);
//   } catch (error) {
//     response.status(500).json({ message: "Server error" });
//   }
// };
// export const getVitals = async (req: Request, res: Response) => {
//   try {
//     const patientId = req.params.id;
//     const vitals = await Vitals.find({ user: patientId });
//     res.json(vitals);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
