import { IOrder } from "@src/entities/order";
import mongoose from "mongoose";

export interface Order extends IOrder {
  id?: string;
}

const orderSchema = new mongoose.Schema(
  {
    
    produtos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
    nvenda: { type: Number, required: true },
    total: { type: Number, required: true },
    formaPagamento: { type: String, required: true },
    troco: { type: Number, required: false },
    valorPago: { type: String, required: false},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    status: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);
export const Order = mongoose.model<Order>("Order", orderSchema);
