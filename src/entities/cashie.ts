import { Sale } from "@src/models/sale";
import { User } from "@src/models/user";

export interface ICashie {
  id?: string;
  sales: Array<Sale>
  openVlue: number;
  closeValue: number;
  closeDate: Date;  
  user: User;
  status: boolean;
}