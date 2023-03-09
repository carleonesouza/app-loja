import mongoose from "mongoose";
import { IUser } from "@src/entities/user";

export interface User extends IUser {
    id?: string;
}

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: Number, required: true },
        cpfCnpj: { type: Number, required: true, unique: true },
        address: new mongoose.Schema(
            {
                street: { type: String, required: true },
                neighborhood: { type: String, required: true },
                zipCode: { type: Number, required: true },
                status: { type: Boolean, required: false },
            }
        ),
        profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
        status: { type: Boolean, required: false },
    },
    {
        timestamps: true
    }
);


export const User = mongoose.model<User>("User", userSchema);
