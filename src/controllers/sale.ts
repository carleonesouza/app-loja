import { Controller, Get, Put, Delete, Post } from '@overnightjs/core';
import { Request, Response} from 'express';
import logger from '@src/logger';
import { SaleMongoDbRepository } from '@src/repositories/saleMongoDbRepository';
import { Sale } from '@src/models/sale';


@Controller("v1/api/sales")
export class SaleController extends SaleMongoDbRepository{

  @Get()
  public async getSale(req: Request, res: Response): Promise<void> {

    try {
      const sales = await this.findAllSales();
      res.status(200).send(sales);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get(":id")
  public async getSaleById(req: Request, res: Response) {
    try {
      const sale = await this.findOne({ _id: req.params.id });
      res.status(200).send(sale);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Put(":id")
  private async update(req: Request, res: Response) {

    try {
      const sale = new Sale(req.body);
      await this.updateSaleById(req.params.id, sale);
      res.status(200).send({ message: "The Sale has been successfully updated!", sale });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post()
  public async createSale(req: Request, res: Response): Promise<void> {

    try {      
        const sale = new Sale(req.body);
        await this.create(sale);
        res.status(201).send({ message: "The Sale has been created successfully!", sale });

    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Delete(":id")
  private async delete(req: Request, res: Response) {
    await this.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "Sale was deleted sucessfully!" });
  }

}