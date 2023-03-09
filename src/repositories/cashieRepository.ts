import { Cashie } from "@src/models/cashie";
import { BaseRepository } from "@src/repositories/base";

export interface CashieRepository extends BaseRepository<Cashie> {
  findCashieById(saleId: string): Promise<Cashie>;
  findAllCashie():Promise<Cashie[]>;
}
