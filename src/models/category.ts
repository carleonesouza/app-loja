import mongoose from "mongoose";
import { ICategory } from "@src/entities/category";

export interface Category extends ICategory {
  id?: string;
}

const schema = new mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true },
  status: { type: Boolean, required: false },
});

export const Category = mongoose.model<Category>("Category", schema);
