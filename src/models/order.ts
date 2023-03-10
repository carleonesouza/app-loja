import { IOrder } from "@src/entities/order";
import mongoose from "mongoose";

export interface Order extends IOrder {
  id?: string;
}

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    change: { type: Number, required: false },
    paymentValue: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);
export const Order = mongoose.model<Order>("Order", orderSchema);
