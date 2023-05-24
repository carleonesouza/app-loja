import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Middleware,
} from "@overnightjs/core";
import { Category } from "@src/models/category";
import { Request, Response } from "express";
import { CategoryMongoDbRepository } from "../repositories/categoryMongoDbRepository";
import logger from "@src/logger";
import { authMiddleware } from "@src/middlewares/auth";
import { userAuthMiddleware } from "@src/middlewares/user-auth";

@Controller("v1/api/categories")
export class CategoryController extends CategoryMongoDbRepository {

  @Get()
  @Middleware([authMiddleware])
  public async getCategory(req: Request, res: Response): Promise<void> {
    try {
      const category = await this.find({});
      res.status(200).send(category);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get(":id")
  @Middleware([authMiddleware])
  public async getCategoryId(req: Request, res: Response) {
    try {
      const category = await this.findOne({ _id: req.params.id });
      res.status(200).send(category);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Put(":id")
  @Middleware([userAuthMiddleware, authMiddleware])
  private async update(req: Request, res: Response) {
    try {
      const category = new Category(req.body);
      await this.updateCategoryById(req.params.id, category);
      res.status(201).send({
        message: "The category has been successfully updated!",
        category,
      });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post(':id')
  @Middleware([userAuthMiddleware, authMiddleware])
  public async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const existCategory = this.findCategoryByName(req.body.name);

      if ((await existCategory).length) {
        res.status(409).send({ message: "Category Already exists!" });
      } else {
        const category = new Category(req.body);

        await this.create(category);
        res.status(201).send({
          message: "The category has been created successfully!",
          category,
        });
      }
    } catch (error) {
      res.status(500).send({ message: error });
      logger.error(error);
    }
  }

  @Delete(":id")
  @Middleware([userAuthMiddleware, authMiddleware])
  private async delete(req: Request, res: Response) {
    await this.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Category deleted successfully!" });
  }
}
