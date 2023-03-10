import mongoose from "mongoose";
import { IUser } from "@src/entities/user";
import bcrypt from "bcrypt";
import baseUtil from "@src/util/baseUtil";

export interface User extends IUser {
    id?: string;
}

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
        phone: { type: Number, required: true },
        cpfCnpj: { type: Number, required: true, unique: true },
        password: { type: String, required: true },
        apiKey: { type: String },
        address: new mongoose.Schema(
            {
                street: { type: String },
                neighborhood: { type: String },
                zipCode: { type: Number },
                status: { type: Boolean },
            }
        ),
        profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
        status: { type: Boolean },
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(baseUtil.SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next();
    }
});

export const User = mongoose.model<User>("User", userSchema);
