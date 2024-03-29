import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  ClassMiddleware,
  Middleware,
} from "@overnightjs/core";
import { Request, Response } from "express";
import logger from "@src/logger";
import { ProfileMongoDbRepository } from "@src/repositories/profileMongoDbRepository";
import { Profile } from "@src/models/profile";
import { authMiddleware } from "@src/middlewares/auth";
import { userAuthMiddleware } from "@src/middlewares/user-auth";

@Controller("v1/api/profiles")
@ClassMiddleware(authMiddleware)
export class ProfileController extends ProfileMongoDbRepository {

  @Get()
  @Middleware([authMiddleware])
  public async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const profiles = await this.find({});
      res.status(200).send(profiles);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get(":id")
  @Middleware([authMiddleware])
  public async getProfileById(req: Request, res: Response) {
    try {
      const profile = await this.findOne({ _id: req.params.id });
      res.status(200).send(profile);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Put(":id")
  @Middleware([userAuthMiddleware, authMiddleware])
  private async update(req: Request, res: Response) {
    try {
      const profile = new Profile(req.body);
      await this.updateProfileById(req.params.id, profile);
      res.status(200).send({
        message: "The profile has been successfully updated!",
        profile,
      });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post(':id')
  public async createProfile(req: Request, res: Response): Promise<void> {
    try {

      this.findUserInStoreById(req.params.id).then(async (user) => {
        if (user) {
          const profile = new Profile(req.body);
          await this.create(profile);
          await this.addProfileToStore(profile, req.params.id)
          res.status(201).send({
            message: "The profile has been created successfully!",
            profile,
          });
        }
      })

    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Delete(":id")
  @Middleware([userAuthMiddleware, authMiddleware])
  private async delete(req: Request, res: Response) {
    await this.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Profile was deleted successfully!" });
  }
}
