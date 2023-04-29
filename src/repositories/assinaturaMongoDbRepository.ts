import { DbMongooseRepository } from "@src/repositories/dbRepository";
import { AssinaturaRepository } from "@src/repositories/assinaturaRepository";
import { Assinatura } from "@src/models/assinatura";
import logger from "@src/logger";


export class AssinaturaMongoDbRepository
  extends DbMongooseRepository<Assinatura>
  implements AssinaturaRepository
{
  private assinaturaModel = Assinatura;

  constructor(assinaturaModel = Assinatura) {
    super(assinaturaModel);
  }

  public async findAssinatura(assinat: Assinatura): Promise<Assinatura> {
    try {
      const assinatura = await this.assinaturaModel
        .findOne({email: assinat})
        .then((assina) =>{
          if(!assina){
            return null;
          }
          return assina;
        });
      return assinatura as Assinatura;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

}
