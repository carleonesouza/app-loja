import { DbMongooseRepository } from "@src/repositories/dbRepository";
import logger from "@src/logger";
import { Cashie } from "@src/models/cashie";
import { CashieRepository } from "@src/repositories/cashieRepository";

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
  public async addOrderToCashie(order: any, id: string): Promise<Cashie> {
    try {
      const updatedCashie = await this.cashieModel.findOneAndUpdate({ _id: id },
        { $push: { orders: order } })
      return updatedCashie as Cashie;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }

  }

  public async findCashieByDay(userId: string, date: string): Promise<Cashie> {
    try {
      const data = await this.cashieModel
        .findOne({ user: userId, criadoEm: date })
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
