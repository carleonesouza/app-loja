import { ISale } from "@src/entities/sale";
import mongoose, { Schema } from "mongoose";


export interface Sale extends ISale {
    id?: string;
}

const saleSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    change: { type: Number, required: false },
    paymentValue: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: Boolean, required: false },
},
    {
        timestamps: true
    }
);
export const Sale = mongoose.model<Sale>("Sale", saleSchema);
