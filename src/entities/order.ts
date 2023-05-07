import { Product } from "@src/models/product";
import { User } from "@src/models/user";

export interface IOrder {
  id?: string;
  produtos: Array<Product>;
  nvenda: number;
  total: number;
  formaPagamento: string;
  troco: number;
  valorPago: number;
  user: User;
  status: boolean;
}
