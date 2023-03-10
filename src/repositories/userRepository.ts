import { User } from "@src/models/user";
import { BaseRepository } from "@src/repositories/base";

export interface UserRepository extends BaseRepository<User> {
  updateUserById(userId: string, data: User): Promise<unknown>;
  findUserById(userId: string): Promise<User>;
  findUserByEmail(email: string): Promise<User>;
  login(email: string, password: string): Promise<unknown>;
  register(data: User): Promise<User>;
  logout(): Promise<unknown>;
}
