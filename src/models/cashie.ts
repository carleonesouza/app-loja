import mongoose from "mongoose";
import { ICashie } from "../entities/cashie";

export interface Cashie extends ICashie {
  id?: string;
}

const cashieSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    valorAbertura: { type: Number, required: true },
    valorFechamento: { type: Number },
    criadoEm: { type: Date, required: true, unique: true},
    fechadoEm: { type: Date },
    status: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

export const Cashie = mongoose.model<Cashie>("Cashie", cashieSchema);
