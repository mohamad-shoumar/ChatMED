"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ResponseSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    symptoms: {
        type: String,
        required: true,
    },
    diagnosis: {
        type: String,
        required: true,
    },
    treatmentPlan: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "edited", "LiveChat", "completed"],
        default: "pending",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const ResponseModel = mongoose_1.default.model("Response", ResponseSchema);
module.exports = ResponseModel;
