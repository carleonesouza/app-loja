import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Middleware,
} from "@overnightjs/core";
import { Request, Response } from "express";
import logger from "@src/logger";
import { OrderMongoDbRepository } from "@src/repositories/orderMongoDbRepository";
import { Order } from "@src/models/order";
import { authMiddleware } from "@src/middlewares/auth";
import { userAuthMiddleware } from "@src/middlewares/user-auth";
import ProdctService from "@src/services/product";

@Controller("v1/api/orders")
export class OrderController extends OrderMongoDbRepository {

  @Get()
  @Middleware([authMiddleware])
  public async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.findAllOrders();
      res.status(200).send(orders);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get(":id")
  @Middleware([authMiddleware])
  public async getOrderById(req: Request, res: Response) {
    try {
      const order = await this.findOrderById(req.params.id);
      res.status(200).send(order);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Put(":id")
  @Middleware([userAuthMiddleware, authMiddleware])
  public async update(req: Request, res: Response) {
    try {
      const order = new Order(req.body);
      await this.updateOrderById(req.params.id, order);
      res.status(200).send(order);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post()
  @Middleware([authMiddleware])
  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const servicepdt = new ProdctService();
      const order = new Order(req.body);
      if (order.produtos.length > 0) {
        order.produtos.forEach(async (pdt) => {
          await servicepdt.updateQuantity(pdt);
        })
      }
      await this.create(order);
      res.status(201).send(order);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Delete(":id")
  @Middleware([userAuthMiddleware, authMiddleware])
  public async delete(req: Request, res: Response) {
    await this.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Order was deleted successfully!" });
  }
}