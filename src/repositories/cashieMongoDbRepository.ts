import { DbMongooseRepository } from "@src/repositories/dbRepository";
import logger from "@src/logger";
import { Cashie } from "@src/models/cashie";
import { CashieRepository } from "@src/repositories/cashieRepository";
import { Store } from "@src/models/store";


export class CashieMongoDbRepository
  extends DbMongooseRepository<Cashie>
  implements CashieRepository {
  private cashieModel = Cashie;
  private storeModel = Store;

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

  public async findUserInStoreById(id: string): Promise<unknown>{
    try {    
      const store = await this.storeModel.findOne({users: id}).populate({
        path: 'users',
        options: { strictPopulate: false },
      }).exec()    
      return store;        
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }


  public async findCashieByDay(userId: string, date: string): Promise<any> {
    try {
     const user = await this.findUserInStoreById(userId);

     if(user){   
      const popObj = {        
        path: "orders",
        populate: {
          path: "produtos",
        },
      };
      const query = this.cashieModel.where({criadoEm: date });
      const data = await query
      .findOne({criadoEm: date })
      .populate("user", "-password")
      .populate(popObj)
      .exec();
      return data as Cashie;
     }
     
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async closeCashieOfDay(cashie: any, id: string): Promise<any> {
    try {
      const user = await this.findUserInStoreById(id);
      if(user){
        const update = { fechadoEm: cashie.fechadoEm, valorFechamento: cashie.valorFechamento, status: cashie.status };
        const filter = { _id: cashie?._id};
        const updatedCashie = await this.cashieModel.findByIdAndUpdate(filter, update, {new: true})
        return updatedCashie;
      }
      
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }
}
