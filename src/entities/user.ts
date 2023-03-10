import { Address } from "@src/models/address";
import { Profile } from "@src/models/profile";

export interface IUser {
  id?: string;
  fullName: string;
  email: string;
  phone: number;
  cpfCnpj: string;
  password?: string;
  apiKey?: string;
  address?: Address;
  profile?: Profile;
  status: boolean;
}
