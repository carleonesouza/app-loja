import { Order } from "@src/models/order";
import { User } from "@src/models/user";

export interface ICashie {
  id?: string;
  orders: Array<Order>;
  valorAbertura: number;
  valorFechamento: number;
  criadoEm: Date;
  fechadoEm: Date;
  user: User;
  status: boolean;
}
