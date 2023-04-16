"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const PatientSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    consultations: [
        {
            doctor: {
                type: Schema.Types.ObjectId,
                ref: "Doctor",
                required: true,
            },
            date: {
                type: Date,
                required: true,
            },
        },
    ],
});
const Patient = mongoose_1.default.model("Patient", PatientSchema);
exports.default = Patient;
