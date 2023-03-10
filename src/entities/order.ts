import { Product } from "@src/models/product";
import { User } from "@src/models/user";

export interface IOrder {
  id?: string;
  product: Product;
  quantity: number;
  total: number;
  paymentMethod: string;
  change: number;
  paymentValue: number;
  user: User;
  status: boolean;
}
