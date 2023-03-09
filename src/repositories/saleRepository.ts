import { Sale } from "@src/models/sale";
import { BaseRepository } from "@src/repositories/base";

export interface SaleRepository extends BaseRepository<Sale> {
  updateSaleById(saleId: string, data: Sale): Promise<any>;
  findSaleById(saleId: string): Promise<Sale>;
  findSaleByEmail(email: string): Promise<Sale>;
  findAllSales():Promise<Sale[]>;
}
