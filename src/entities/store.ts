import { User } from '@src/models/user';
import { Address } from '../models/address';
import { Product } from '@src/models/product';
import { Category } from '@src/models/category';
import { Profile } from '@src/models/profile';
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
    categorias: Array<Category>;
    profiles: Array<Profile>;
    status?: boolean;
  }
  