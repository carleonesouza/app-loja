import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Middleware,
} from "@overnightjs/core";
import { UserMongoDbRepository } from "@src/repositories/userMongoDbRepository";
import { Request, Response } from "express";
import logger from "@src/logger";
import { User } from "@src/models/user";
import { authMiddleware } from "@src/middlewares/auth";
import { apiKey } from "@src/middlewares/api-key";
import AuthService from "@src/services/auth";
import { userAuthMiddleware } from "@src/middlewares/user-auth";
import { Assinatura } from "@src/models/assinatura";
import { Store } from "@src/models/store";

@Controller("v1/api/users")
export class UserController extends UserMongoDbRepository {
  
  @Get('group/:id')
  @Middleware([authMiddleware])
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const storeModel = Store;
      const store = await storeModel.findOne({users: req.params.id}).populate({path: 'users', options: { strictPopulate: false }}).limit(5).exec();
      const recievdStore = new Store(store);  
      res.status(200).send(recievdStore.users);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get(":id")
  @Middleware([authMiddleware])
  public async getUserById(req: Request, res: Response) {
    try {
      const user = await this.findUserById(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Put(":id")
  @Middleware([userAuthMiddleware, authMiddleware])
  private async update(req: Request, res: Response) {
    try {
      const user = new User(req.body);
      await this.updateUserById(req.params.id, user);
      res
        .status(200)
        .send({ message: "The User has been successfully updated!", user });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  
  @Put("reset-pwd/:id")
  @Middleware([userAuthMiddleware, authMiddleware])
  private async updatePwd(req: Request, res: Response) {
    try {
      const user = new User(req.body);
      await this.updateUserPwd(req.params.id, user);
      res
        .status(200)
        .send({ message: "Password has been successfully updated!", user });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post('create-user/:id')
  @Middleware([userAuthMiddleware, authMiddleware])
  public async createUser(req: Request, res: Response): Promise<void> {

    try {
      const existUser = await this.findUserByEmail(req.body.email);
      if (existUser) {
        res.status(409).send({ message: "User Already exists!" });
      } else {
        const user = new User(req.body);
        await this.create(user);
        await this.addUserToStoreByUserId(user, req.params.id)
        res.status(201).send({ message: "The User has been created successfully!", user });
      }
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post("register/:id")
  @Middleware(apiKey)
  public async registerUser(req: Request, res: Response): Promise<void> {
    const signatureModel = Assinatura;
    const storeModel = Store;
    try {
      const existUser =  await this.findUserByEmail(req.body.email);
      if (existUser) {
        res.status(409).send({ message: "User Already exists!" });
      } else {
        const user = new User(req.body.user);
        this.register(user, req.params.id)
          .then((result) => {
            const token = AuthService.generateToken(
              result.email,
              result.id as string
            );
            res.status(201).send({ accessToken: token , user: {name: result.fullName, email: result.email, _id: result.id, profile: result.profile }});
          })
          .catch((error) => {          
            signatureModel.findOneAndDelete({email: req.body.store.owner});
            storeModel.findOneAndDelete({owner: req.body.store.owner});

            res.status(500).send(error);
            logger.error(error);
          });
      }
    } catch (error) {
      signatureModel.findOneAndDelete({email: req.body.store.owner});
      storeModel.findOneAndDelete({owner: req.body.store.owner});
      
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post("login")
  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const existUser = this.findUserByEmail(req.body.email).then((user) => {
        this.login(req.body.email, req.body.password)
          .then((result) => {
            if (result) {
              const token = AuthService.generateToken(
                user.email,
                user.id as string
              );
              res.status(200).send({ accessToken: token , user: {name: user.fullName, email: user.email, _id: user.id, profile: user.profile }});
            } else {
              throw new Error("Email or password invalid!");
            }
          })
          .catch((err) => {
            logger.error(err);
            res.status(401).send({ message: "Unauthorized!" });
          });
      });
      if (!existUser) {
        res.status(404).send({ message: "User not exists!" });
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send(error).json();
    }
  }


  @Get("logout")
  private async logOut(req: Request, res: Response) {
    try {
      req.context = {
        userId: this.logout(),
      };
      res.status(200).send({ message: "Logout was done Successfully" });
    } catch (error) {
      logger.error(error);
      res.status(500).send(error).json();
    }
  }

  @Delete("disbale/:id")
  @Middleware([userAuthMiddleware, authMiddleware])
  private async delete(req: Request, res: Response) {
    const user = new User(req.body);
    await this.disableUser(req.params.id, user);
    res.status(200).json({ message: "The User was removed successfully!" });
  }
}
 