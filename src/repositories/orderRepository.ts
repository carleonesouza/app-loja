import { Order } from "@src/models/order";
import { BaseRepository } from "@src/repositories/base";

export interface OrderRepository extends BaseRepository<Order> {
  updateOrderById(orderId: string, data: Order): Promise<any>;
  findOrderById(orderId: string): Promise<Order>;
  findOrderByEmail(email: string): Promise<Order>;
  findAllOrders(): Promise<Order[]>;
}
