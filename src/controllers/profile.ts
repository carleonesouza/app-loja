import { Controller, Get, Put, Delete, Post } from '@overnightjs/core';
import { Request, Response} from 'express';
import logger from '@src/logger';
import { ProfileMongoDbRepository } from '@src/repositories/profileMongoDbRepository';
import { Profile } from '@src/models/profile';


@Controller("v1/api/profiles")
export class ProfileController extends ProfileMongoDbRepository{

  @Get()
  public async getProfile(req: Request, res: Response): Promise<void> {

    try {
      const profiles = await this.find({});
      res.status(201).send(profiles);
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Get(":id")
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
  private async update(req: Request, res: Response) {

    try {
      const profile = new Profile(req.body);
      await this.updateProfileById(req.params.id, profile);
      res.status(201).send({ message: "The profile has been successfully updated!", profile });
    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Post()
  public async createUser(req: Request, res: Response): Promise<void> {

    try {
      const existProfile = this.findProfileByName(req.body.name);
      if (await existProfile) {
        res.status(409).send({ message: 'Profile Already exists!' });
      } else {
        const profile = new Profile(req.body);

        await this.create(profile);
        res.status(201).send({ message: "The profile has been created successfully!", profile });
      }

    } catch (error) {
      res.status(500).send(error);
      logger.error(error);
    }
  }

  @Delete(":id")
  private async delete(req: Request, res: Response) {
    await this.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "Profile was deleted sucessfully!" });
  }

}