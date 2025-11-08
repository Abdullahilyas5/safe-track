import mongoose from "mongoose";
import { email } from "zod";


const locSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{
    timestamps: true,   
})

export const Location = mongoose.models.Location || mongoose.model("Location", locSchema);