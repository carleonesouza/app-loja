import mongoose from "mongoose";
import { IProduct } from "@src/entities/product";

export interface Product extends IProduct {
  id?: string;
}

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  classification: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  volume: { type: String, required: true },
  quantity: { type: Number, required: false },
  status: { type: Boolean, required: false },
});
export const Product = mongoose.model<Product>("Product", schema);
