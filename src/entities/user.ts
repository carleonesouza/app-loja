import { Address } from "@src/models/address";
import { Profile } from "@src/models/profile";

export interface IUser {
  id?: string;
  fullName: string;
  email: string;
  phone: number;
  cpf: string;
  password?: string;
  address?: Address;
  profile?: Profile;
  status: boolean;
}
