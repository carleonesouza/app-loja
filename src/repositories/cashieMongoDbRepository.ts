import { DbMongooseRepository } from "@src/repositories/dbRepository";
import logger from "@src/logger";
import { Cashie } from "@src/models/cashie";
import { CashieRepository } from "@src/repositories/cashieRepository";
import moment from 'moment';
moment.locale('pt-br')

export class CashieMongoDbRepository
  extends DbMongooseRepository<Cashie>
  implements CashieRepository {
  private cashieModel = Cashie;

  constructor(cashieModel = Cashie) {
    super(cashieModel);
  }

  public async findAllCashie(): Promise<Cashie[]> {
    try {
      const cashies = await this.cashieModel
        .find()
        .populate("user", "-password")
        .populate("orders")
        .exec();
      return cashies;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async findCashieById(cashieId: string): Promise<Cashie> {
    try {
      const data = await this.cashieModel
        .findOne({ _id: cashieId })
        .populate("user", "-password")
        .populate("orders")
        .exec();
      return data as Cashie;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async addOrderToCashie(cashie: Cashie): Promise<Cashie> {
    try {
      const updatedCashie = await this.cashieModel.findOneAndUpdate({ _id: cashie.id },
        { $push: { orders: cashie.orders[0] } })
      return updatedCashie as Cashie;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }

  }

  public async findCashieByDay(userId: string): Promise<Cashie> {
    const today = moment().format('L'); 
    try {
      const data = await this.cashieModel
        .findOne({ user: userId, criadoEm: today})
        .populate("user", "-password")
        .populate("orders")
        .exec();
      return data as Cashie;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }
}
