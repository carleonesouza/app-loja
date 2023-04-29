import { Assinatura } from "@src/models/assinatura";
import { BaseRepository } from "@src/repositories/base";


export interface AssinaturaRepository extends BaseRepository<Assinatura> {
    findAssinatura(assinatura: Assinatura): Promise<Assinatura>;
  }
  