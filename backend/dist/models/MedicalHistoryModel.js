"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const MedicalHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    allergies: [
        {
            type: String,
        },
    ],
    medications: [
        {
            type: String,
        },
    ],
    surgeries: [
        {
            type: String,
        },
    ],
    chronicConditions: [
        {
            type: String,
        },
    ],
    dateOfBirth: {
        type: Date,
    },
});
const MedicalHistoryModel = mongoose_1.default.model("MedicalHistory", MedicalHistorySchema);
exports.default = MedicalHistoryModel;
