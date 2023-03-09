import { DbMongooseRepository } from "@src/repositories/dbRepository";
import logger from "@src/logger";
import { Cashie } from "@src/models/cashie";
import { CashieRepository } from "@src/repositories/cashieRepository";


export class CashieMongoDbRepository extends DbMongooseRepository<Cashie> implements CashieRepository {

    private cashieModel = Cashie;

    constructor(cashieModel = Cashie) {
        super(cashieModel);
    }


    public async findAllCashie(): Promise<Cashie[]> {
        try {
            const cashies = await this.cashieModel.find().populate('user').populate('sale');
            return cashies ;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }


    public async findCashieById(cashieId: string): Promise<Cashie> {
        try {
            const data = await this.cashieModel.findOne({ _id: cashieId }).populate('user').populate('sale');
            return data as Cashie;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }

}
