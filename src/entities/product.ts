import { Category } from "@src/models/category";

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  classification: string;
  category: Category;
  volume: number;
  quantity: number;
  status: boolean;
}
