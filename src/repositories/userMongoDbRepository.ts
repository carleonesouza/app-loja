import { UserRepository } from "@src/repositories/userRepository";
import { DbMongooseRepository } from "@src/repositories/dbRepository";
import { User } from "@src/models/user";
import logger from "@src/logger";
import { validatePassword } from "@src/middlewares/validade";

export class UserMongoDbRepository
  extends DbMongooseRepository<User>
  implements UserRepository
{
  private userModel = User;

  constructor(userModel = User) {
    super(userModel);
  }

  public async login(email: string, password: string): Promise<any> {
    try {
      return this.userModel
        .findOne({ email: email })
        .then((user) => {
          return validatePassword(password, user?.password);
        })
        .catch((error) => {
          logger.error(error);
          this.handleError(error);
        });
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async logout(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async register(data: User): Promise<User> {
    try {
      const user = new User({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        cpfCnpj: data.cpfCnpj,
        password: data.password,
        apiKey: data.apiKey,
        address: data.address,
      });

      const newUser = await user.save();
      return newUser as User;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async updateUserById(userId: string, user: User): Promise<any> {
    try {
      const data = await this.userModel.updateOne(
        { _id: userId },
        {
          $set: {
            fullName: user.fullName,
            phone: user.phone,
            address: user.address,
            profile: user.profile,
            status: user.status,
          },
        }
      );
      return data;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async findUserById(userId: string): Promise<User> {
    try {
      const data = await this.findOne({ _id: userId });
      return data as User;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async findUserByEmail(email: string): Promise<User> {
    try {
      const data = await this.userModel.findOne({ email: email });
      return data as User;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }
}
