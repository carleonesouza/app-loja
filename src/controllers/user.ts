import { Controller, Get, Put, Delete, Post } from '@overnightjs/core';
import { UserMongoDbRepository } from '@src/repositories/userMongoDbRepository';
import { Request, Response} from 'express';
import logger from '@src/logger';
import { User } from '@src/models/user';

@Controller("v1/api/users")
export class UserController extends UserMongoDbRepository{

  @Get()
  public async getUser(req: Request, res: Response): Promise<void> {

    try {
      const users = await this.find({});
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get(":id")
  public async getUserById(req: Request, res: Response) {
    try {
      const user = await this.findOne({ _id: req.params.id });
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Put(":id")
  private async update(req: Request, res: Response) {

    try {
      const user = new User(req.body);
      await this.updateUserById(req.params.id, user);
      res.status(200).send({ message: "The User has been successfully updated!", user });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post()
  public async createUser(req: Request, res: Response): Promise<void> {

    try {
      const existUser = this.findUserByEmail(req.body.email);
      if (await existUser) {
        res.status(409).send({ message: 'User Already exists!' });
      } else {
        const user = new User(req.body);

        await this.create(user);
        res.status(201).send({ message: "The User has been created successfully!", user });
      }

    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post()
  public async registerUser(req: Request, res: Response): Promise<void>{
    try {
      const existUser = this.findUserByEmail(req.body.email);
      if (await existUser) {
        res.status(409).send({ message: 'User Already exists!' });
      } else {
        const user = new User(req.body);
        const token = this.register(user);
        res.status(201).send({accessToken: token});
      }

    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get()
  public async loginUser(req: Request, res: Response): Promise<void>{
    try {
      const existUser = this.findUserByEmail(req.body.email);
      if (!existUser) {
        res.status(404).send({ message: 'User not exists!' });
      } else {
  
        const token = this.login(req.params.email, req.params.password);

        res.status(200).send({accessToken: token});
      }

    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Delete(":id")
  private async delete(req: Request, res: Response) {
    await this.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "The User was deleted sucessfully!" });
  }

}