import { User } from '@src/models/user';
import { Address } from '../models/address';
import { Product } from '@src/models/product';
export interface IStore {
    id?: string;
    name: string;
    owner: string;
    cnpj: string;
    apiKey: string;
    phone: number;
    address: Address;
    users: Array<User>;
    produtos: Array<Product>;
    status?: boolean;
  }
  