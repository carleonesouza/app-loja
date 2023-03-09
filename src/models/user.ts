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
        password: { type: String, required: true },
        apiKey: { type: String },
        address: new mongoose.Schema(
            {
                street: { type: String},
                neighborhood: { type: String },
                zipCode: { type: Number},
                status: { type: Boolean},
            }
        ),
        profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
        status: { type: Boolean},
    },
    {
        timestamps: true
    }
);


export const User = mongoose.model<User>("User", userSchema);
