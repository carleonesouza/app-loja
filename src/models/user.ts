import mongoose, { Schema } from "mongoose";
import { IUser } from "@src/entities/user";

export interface User extends IUser {
    id?: string;
}

const schema = new mongoose.Schema(
    {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    cpfCnpj: { type: Number, required: true, unique: true },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
    status: { type: Boolean, required: false },
    },
    {
        timestamps: true
    }
);
export const User = mongoose.model<User>("User", schema);
