import {
  Controller,
  Get,
  Post,
  Delete,
  Middleware,
  Put,
} from "@overnightjs/core";
import { Request, Response } from "express";
import logger from "@src/logger";
import { CashieMongoDbRepository } from "@src/repositories/cashieMongoDbRepository";
import { Cashie } from "@src/models/cashie";
import { authMiddleware } from "@src/middlewares/auth";
import { userAuthMiddleware } from "@src/middlewares/user-auth";

@Controller("v1/api/cashies")
export class CashieController extends CashieMongoDbRepository {
  
  @Get()
  @Middleware([authMiddleware])
  public async getCashie(req: Request, res: Response): Promise<void> {
    try {
      const cashies = await this.findAllCashie();
      res.status(200).send(cashies);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get(":id")
  @Middleware([authMiddleware])
  public async getCashieById(req: Request, res: Response) {
    try {
      const cashie = await this.findOne({ _id: req.params.id });
      res.status(200).send(cashie);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post('day/:id')
  @Middleware([authMiddleware])
  public async getCashieByDay(req: Request, res: Response) {
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

  @Post('yesterday/:id')
  @Middleware([authMiddleware])
  public async getCashieYesterday(req: Request, res: Response) {
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
  @Middleware([authMiddleware])
  public async createCashie(req: Request, res: Response): Promise<void> {
    try {
      const cashie = new Cashie(req.body);
      await this.create(cashie);
      res.status(201).send(cashie);
    } catch (error) {
      res.status(500).send({ message: error });
      logger.error(error);
    }
  }

  @Put(':id')
  @Middleware([authMiddleware])
  public async update(req: Request, res: Response): Promise<void> {
    try {      
      const result = await this.addOrderToCashie(req.body, req.params.id);
      res.status(201).send(result);
    } catch (error) {
      res.status(500).send({ message: error });
      logger.error(error);
    }
  }


  @Put('close/:id')
  @Middleware([authMiddleware])
  public async closeCashie(req: Request, res: Response): Promise<void> {
    try {      
      const result = await this.closeCashieOfDay(req.body, req.params.id);
      res.status(201).send(result);
    } catch (error) {
      res.status(500).send({ message: error });
      logger.error(error);
    }
  }

  @Delete(":id")
  @Middleware([userAuthMiddleware, authMiddleware])
  public async delete(req: Request, res: Response) {
    await this.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Cashie deleted successfully!" });
  }
}