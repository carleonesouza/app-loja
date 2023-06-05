import { DbMongooseRepository } from "@src/repositories/dbRepository";
import logger from "@src/logger";
import { Order } from "@src/models/order";
import { OrderRepository } from "@src/repositories/orderRepository";
import { Store } from "@src/models/store";

export class OrderMongoDbRepository
  extends DbMongooseRepository<Order>
  implements OrderRepository
{
  private orderModel = Order;
  private storeModel = Store;

  constructor(orderModel = Order) {
    super(orderModel);
  }

  public async findAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.orderModel
        .find()
        .populate("product")
        .populate("user", "-password")
        .exec();
      return orders;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async updateOrderById(orderId: string, _order: Order): Promise<unknown> {
    try {
      const data = await this.orderModel.updateOne({ _id: orderId });
      return data;
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


  public async findOrderById(orderId: string): Promise<Order> {
    try {
      const data = await this.orderModel
        .findOne({ _id: orderId })
        .populate("product")
        .populate("user", "-password")
        .exec();
      return data as Order;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async findOrderByEmail(email: string): Promise<Order> {
    try {
      const data = await this.orderModel.findOne({ email: email });
      return data as Order;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }
}
