import mongoose from "mongoose";
import { email } from "zod";


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    role :{type: String, enum: ['child', 'parent'], default: 'child' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

},{
    timestamps: true,   
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);