"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DoctorSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    specialization: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    workingHours: {
        start: {
            type: String,
            required: true,
        },
        end: {
            type: String,
            required: true,
        },
    },
    patients: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});
const Doctor = mongoose_1.default.model("Doctor", DoctorSchema);
exports.default = Doctor;
