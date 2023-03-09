import { Profile } from "@src/models/profile";
import { BaseRepository } from "@src/repositories/base";

export interface ProfileRepository extends BaseRepository<Profile> {
  updateProfileById(profileId: string, data: Profile): Promise<any>;
  findProfileById(profileId: string): Promise<Profile>;
  findProfileByName(name: string): Promise<Profile>;
}
