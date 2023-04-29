import mongoose from "mongoose";
import { IAssinatura } from "@src/entities/assinatura";

export interface Assinatura extends IAssinatura {
  id?: string;
}

const assinatura = new mongoose.Schema(
  {
    apiKey: { type: String },
    email: { type: String, required: true, unique: true },
    status: { type: Boolean, required: false },
  },
  {
    timestamps: true,
  }
);

export const Assinatura = mongoose.model<Assinatura>("Assinatura", assinatura);