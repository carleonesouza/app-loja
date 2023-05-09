import {
  Controller,
  Get,
  Post,
  Delete,
  ClassMiddleware,
  Put,
} from "@overnightjs/core";
import { Request, Response } from "express";
import logger from "@src/logger";
import { CashieMongoDbRepository } from "@src/repositories/cashieMongoDbRepository";
import { Cashie } from "@src/models/cashie";
import { authMiddleware } from "@src/middlewares/auth";

@Controller("v1/api/cashies")
@ClassMiddleware(authMiddleware)
export class CashieController extends CashieMongoDbRepository {
  @Get()
  private async getCashie(req: Request, res: Response): Promise<void> {
    try {
      const cashies = await this.findAllCashie();
      res.status(200).send(cashies);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get(":id")
  private async getCashieById(req: Request, res: Response) {
    try {
      const cashie = await this.findOne({ _id: req.params.id });
      res.status(200).send(cashie);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post('user/:id')
  private async getCashieByDay(req: Request, res: Response) {
    try {
      const cashie = await this.findCashieByDay(req.params.id, req.body.date);
      if(cashie == null || cashie == undefined){
        res.status(404).json({message:'It does not exist cashie open for today!'});
        return;
      }
      res.status(200).send(cashie);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post()
  private async createCashie(req: Request, res: Response): Promise<void> {
    try {
      const cashie = new Cashie(req.body);
      await this.create(cashie);
      res.status(201).send({ message: "The Cashie has been created successfully!", cashie });
    } catch (error) {
      res.status(500).send({ message: error });
      logger.error(error);
    }
  }

  @Put(':id')
  private async update(req: Request, res: Response): Promise<void> {
    try {      
      const result = await this.addOrderToCashie(req.body, req.params.id);
      res.status(201).send({ message: "The Cashie has been updated successfully!", result });
    } catch (error) {
      res.status(500).send({ message: error });
      logger.error(error);
    }
  }

  @Delete(":id")
  private async delete(req: Request, res: Response) {
    await this.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Cashie deleted successfully!" });
  }
}
