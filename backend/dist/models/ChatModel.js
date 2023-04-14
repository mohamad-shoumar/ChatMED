"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const chatSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
});
module.exports = mongoose_1.default.model("Chat", chatSchema);
