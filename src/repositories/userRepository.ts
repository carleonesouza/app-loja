import { User } from "@src/models/user";
import { BaseRepository } from "@src/repositories/base";

export interface UserRepository extends BaseRepository<User> {
  updateUserById(userId: string, data: User): Promise<unknown>;
  updateUserPwd(userId: string, data: User): Promise<unknown>;
  disableUser(userId: string, data: User): Promise<unknown>;
  findAllusers(apiKey: string): Promise<User[]>;
  findUserById(userId: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  login(email: string, password: string): Promise<unknown>;
  register(data: User, storeId: string): Promise<User>;
  logout(): void;
}
