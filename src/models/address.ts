import mongoose from "mongoose";
import { IAddress } from '@src/entities/address';

export interface Address extends IAddress {
    id?: string;
}

const schema = new mongoose.Schema(
    {
    street: { type: String, required: true },
    neighborhood:{ type: String, required: true },
    zipCode: { type: Number, required: true },
    status: { type: Boolean, required: false },
    },
    {
        timestamps: true
    }
);
export const Address = mongoose.model<Address>("Address", schema);
