import { DbMongooseRepository } from "@src/repositories/dbRepository";
import { ProfileRepository } from "@src/repositories/profileRepository";
import logger from "@src/logger";
import { Profile } from "@src/models/profile";

export class ProfileMongoDbRepository
  extends DbMongooseRepository<Profile>
  implements ProfileRepository
{
  private profileModel = Profile;

  constructor(profileModel = Profile) {
    super(profileModel);
  }

  public async updateProfileById(
    profileId: string,
    profile: Profile
  ): Promise<unknown> {
    try {
      const data = await this.profileModel.updateOne(
        { _id: profileId },
        {
          $set: {
            role: profile.role,
            status: profile.status,
          },
        }
      );
      return data;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async findProfileById(profileId: string): Promise<Profile> {
    try {
      const data = await this.findOne({ _id: profileId });
      return data as Profile;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async findProfileByName(name: string): Promise<Profile> {
    try {
      const data = await this.profileModel.findOne({ role: name });
      return data as Profile;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }
}
