import mongoose from "mongoose";
import { IProfile } from "@src/entities/profile";

export interface Profile extends IProfile {
    id?: string;
}

const schema = new mongoose.Schema(
    {
    role: { type: String, required: true },
    status: { type: Boolean, required: false },
    },
    {
        timestamps: true
    }
);
export const Profile = mongoose.model<Profile>("Profile", schema);
