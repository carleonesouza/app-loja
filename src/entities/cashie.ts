import { Order } from "@src/models/order";
import { User } from "@src/models/user";

export interface ICashie {
  id?: string;
  orders: Array<Order>;
  openVlue: number;
  closeValue: number;
  closeDate: Date;
  user: User;
  status: boolean;
}
