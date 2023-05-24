export interface IAddress {
  id?: string;
  street: string;
  neighborhood: string;
  city?: string;
  state?: string;
  zipCode: number;
  status: boolean;
}
