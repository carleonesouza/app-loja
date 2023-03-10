import { DbMongooseRepository } from "@src/repositories/dbRepository";
import logger from "@src/logger";
import { Order } from "@src/models/order";
import { OrderRepository } from "@src/repositories/orderRepository";

export class OrderMongoDbRepository
  extends DbMongooseRepository<Order>
  implements OrderRepository
{
  private orderModel = Order;

  constructor(orderModel = Order) {
    super(orderModel);
  }

  public async findAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.orderModel
        .find()
        .populate("product")
        .populate("user")
        .exec();
      return orders;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async updateOrderById(
    orderId: string,
    order: Order
  ): Promise<unknown> {
    try {
      const data = await this.orderModel.updateOne(
        { _id: orderId },
        {
          $set: {
            product: order.product,
            quantity: order.quantity,
            total: order.total,
            paymentMethod: order.paymentMethod,
            change: order.change,
            paymentValue: order.paymentValue,
            user: order.user,
            status: order.status,
          },
        }
      );
      return data;
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
        .populate("user")
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
