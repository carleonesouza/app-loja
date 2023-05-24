import { Controller, Delete, Get, Middleware, Post, Put } from "@overnightjs/core";
import logger from "@src/logger";
import { apiKey } from "@src/middlewares/api-key";
import { authMiddleware } from "@src/middlewares/auth";
import { userAuthMiddleware } from "@src/middlewares/user-auth";
import { Product } from "@src/models/product";
import { Store } from "@src/models/store";
import { User } from "@src/models/user";
import { StoreMongoDbRepository } from "@src/repositories/storeMongoDbRepository";
import { Request, Response } from "express";


@Controller("v1/api/stores")
export class StoreController extends StoreMongoDbRepository{

    @Get(":id")
    public async getStore(req: Request, res: Response): Promise<void> {
      try {
        const store = await this.findStore(req.params.id);
        res.status(200).send(store);
      } catch (error) {
        res.status(500).send(error);
        logger.error(error);
      }
    }
  
    @Get()
    @Middleware([authMiddleware])
    public async getProductById(req: Request, res: Response) {
      try {
        const store = await this.findStoreUserByEmail(req.body.email);
        res.status(200).send(store);
      } catch (error) {
        res.status(500).send(error);
        logger.error(error);
      }
    }
  
    @Put(":id")
    @Middleware([userAuthMiddleware, authMiddleware])
    private async update(req: Request, res: Response) {
      try {
        const store = new Store(req.body);
        await this.updateStoreById(req.params.id, store);
        res.status(200).send({
          message: "The Store has been successfully updated!",
          store,
        });
      } catch (error) {
        res.status(500).send(error);
        logger.error(error);
      }
    }

    @Put("products/:id")
    @Middleware([userAuthMiddleware, authMiddleware])
    private async addProductStore(req: Request, res: Response) {
      try {
        const product = new Product(req.body);
        await this.addProductToStore(product, req.params.id);
        res.status(200).send({
          message: "The Product has been added to Store successfully!"});
      } catch (error) {
        res.status(500).send(error);
        logger.error(error);
      }
    }

    @Put("users/:id")
    @Middleware([userAuthMiddleware, authMiddleware])
    private async addUserStore(req: Request, res: Response) {
      try {
        const user = new User(req.body);
        await this.addUserToStore(user, req.params.id);
        res.status(200).send({
          message: "The User has been added to Store successfully!"});
      } catch (error) {
        res.status(500).send(error);
        logger.error(error);
      }
    }
  
    @Post("register")
    @Middleware(apiKey)
    public async registerStore(req: Request, res: Response): Promise<void> {
      try {
        const existStore = await this.findStoreUserByEmail(req.body.email);
        if (existStore) {
          res.status(409).send({ message: "Store Already exists!" });
        } else {
          const user = new Store(req.body);
          this.createStore(user)
            .then((result) => {              
              res.status(201).send(result);
            })
            .catch((error) => {
              res.status(500).send(error);
              logger.error(error);
            });
        }
      } catch (error) {
        res.status(500).send(error);
        logger.error(error);
      }
    }
  
    @Delete(":id")
    @Middleware([userAuthMiddleware, authMiddleware])
    private async disable(req: Request, res: Response) {
      await this.disableStore(req.params.id, req.body);
      res.status(200).json({ message: "Store deleted successfully!" });
    }
  }
  