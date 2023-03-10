import mongoose from "mongoose";
import { ICashie } from "../entities/cashie";

export interface Cashie extends ICashie {
  id?: string;
}

const cashieSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orders: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    ],
    openValue: { type: Number, required: true },
    closeValue: { type: Number, required: true },
    closeDate: { type: Date, default: Date.now, required: true },
    status: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

export const Cashie = mongoose.model<Cashie>("Cashie", cashieSchema);
