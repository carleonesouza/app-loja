import { Controller, Get, Post, Put, Delete, ClassMiddleware } from "@overnightjs/core";
import logger from "@src/logger";
import { authMiddleware } from "@src/middlewares/auth";
import { Product } from "@src/models/product";
import { ProductMongoDbRepository } from "@src/repositories/productMongoDbRepository";
import { Request, Response } from "express";

@Controller("v1/api/products")
@ClassMiddleware(authMiddleware)
export class ProductController extends ProductMongoDbRepository {

  @Get()
  public async getProduct(req: Request, res: Response): Promise<void> {

    try {
      const products = await this.findAllProducts();
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get(":id")
  public async getProductById(req: Request, res: Response) {
    try {
      console.log(req.params);
      const product = await this.findProductById(req.params.id);
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Put(":id")
  private async update(req: Request, res: Response) {

    try {
      const product = new Product(req.body);
      await this.updateProductById(req.params.id, product);
      res.status(200).send({ message: "The product has been successfully updated!", product });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post()
  public async createProduct(req: Request, res: Response): Promise<void> {

    try {
      const existProduct = this.findProductByName(req.body.name);
      if ((await existProduct).length) {
        res.status(409).send({ message: 'Product Already exists!' });
      } else {
        const product = new Product(req.body);

        await this.create(product);
        res.status(201).send({ message: "The product has been created successfully!", product });
      }

    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Delete(":id")
  private async delete(req: Request, res: Response) {
    await this.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "Product deleted sucessfully!" });
  }
}
