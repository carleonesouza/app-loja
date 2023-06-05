import { DbMongooseRepository } from "@src/repositories/dbRepository";
import { ProfileRepository } from "@src/repositories/profileRepository";
import logger from "@src/logger";
import { Profile } from "@src/models/profile";
import { Store } from "@src/models/store";

export class ProfileMongoDbRepository
  extends DbMongooseRepository<Profile>
  implements ProfileRepository
{
  private profileModel = Profile;
  private storeModel = Store;

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

  public async findUserInStoreById(id: string): Promise<unknown>{
    try {    
      const store = await this.storeModel.findOne({users: id}).populate({
        path: 'users',
        options: { strictPopulate: false },
      }).exec()    
      return store;        
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async addProfileToStore(profile: Profile, id: string) {
    try {
    
      const store = await this.storeModel.findOne({users: id}).populate({
        path: 'profiles',
        options: { strictPopulate: false },
      }).exec()
      store?.profiles.push(profile)
      return await store?.save();      
    } catch (error) {    
       throw new Error(" "+error)
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
