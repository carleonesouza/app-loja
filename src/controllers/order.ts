import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  ClassMiddleware,
} from "@overnightjs/core";
import { Request, Response } from "express";
import logger from "@src/logger";
import { OrderMongoDbRepository } from "@src/repositories/orderMongoDbRepository";
import { Order } from "@src/models/order";
import { authMiddleware } from "@src/middlewares/auth";

@Controller("v1/api/orders")
@ClassMiddleware(authMiddleware)
export class OrderController extends OrderMongoDbRepository {
  @Get()
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
  public async getgetOrderById(req: Request, res: Response) {
    try {
      const order = await this.findOne({ _id: req.params.id });
      res.status(200).send(order);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Put(":id")
  private async update(req: Request, res: Response) {
    try {
      const order = new Order(req.body);
      await this.updateOrderById(req.params.id, order);
      res
        .status(200)
        .send({ message: "The Order has been successfully updated!", order });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post()
  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const order = new Order(req.body);
      await this.create(order);
      res
        .status(201)
        .send({ message: "The Order has been created successfully!", order });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Delete(":id")
  private async delete(req: Request, res: Response) {
    await this.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Order was deleted successfully!" });
  }
}
