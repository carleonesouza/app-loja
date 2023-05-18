import { UserRepository } from "@src/repositories/userRepository";
import { DbMongooseRepository } from "@src/repositories/dbRepository";
import { User } from "@src/models/user";
import logger from "@src/logger";
import { validatePassword } from "@src/middlewares/validate";

export class UserMongoDbRepository
  extends DbMongooseRepository<User>
  implements UserRepository
{
  private userModel = User;

  constructor(userModel = User) {
    super(userModel);
  }

  public logout() {
    return "";
  }

  public async login(email: string, password: string): Promise<unknown> {
    try {
      return this.userModel
        .findOne({ email: email })
        .populate("profiles")
        .exec()
        .then((user) => {
          return validatePassword(password, user?.password as string);
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

  public async register(data: User): Promise<User> {
    try {
      const user = new User({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        cpfCnpj: data.cpfCnpj,
        password: data.password,
        apiKey: data.apiKey,
      });
      const newUser = await user.save();
      return newUser as User;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async updateUserById(userId: string, user: User): Promise<unknown> {
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
      const data = await this.userModel.findOne({ _id: userId })
      .populate("profiles")
      .exec();
      return data as User;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async findUserByEmail(email: string): Promise<User> {
    try {
      const data = await this.userModel.findOne({ email: email })
      .populate("profiles")
      .exec();
      return data as User;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }
}
