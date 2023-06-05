import { UserRepository } from "@src/repositories/userRepository";
import { DbMongooseRepository } from "@src/repositories/dbRepository";
import { User } from "@src/models/user";
import logger from "@src/logger";
import { validatePassword } from "@src/middlewares/validate";
import { Error } from "mongoose";
import { Profile } from "@src/models/profile";
import { Store } from "@src/models/store";

export class UserMongoDbRepository
  extends DbMongooseRepository<User>
  implements UserRepository {
  private userModel = User;
  private profileModel = Profile;
  private storeModel = Store;

  constructor(userModel = User) {
    super(userModel);
  }

  findAllusers(apiKey: string): Promise<User[]> {
    try {
      return this.userModel
        .find({ apiKey: apiKey })
        .select('-password')
        .exec();
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public logout() {
    return "";
  }

  public async login(email: string, password: string): Promise<boolean> {
    try {
      return this.userModel
        .findOne({ email: email })
        .populate({
          path: 'profile',
          options: { strictPopulate: false },
        })
        .exec()
        .then((user) => {
          if (!user?.status) {
            throw new Error("User disabled!");
          }
          return validatePassword(password, user?.password as string);
        });
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  async createAdminProfile(profile: string): Promise<Profile> {
    const adminProfile = await this.profileModel.findOne({ role: profile }).exec();
    if (adminProfile) {
      return adminProfile as Profile;
    } else {
      const admin = new Profile({ role: profile, status: true })
      const result = this.profileModel.create(admin);
      return result;
    }
  }

  public async register(data: User, storeId: string): Promise<User> {
    try {
      const localP = (await this.createAdminProfile("Admin")) as Profile;
      const user = new User({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        cpf: data.cpf,
        password: data.password,
        profile: localP,
        status: true
      });
      const newUser = await user.save();
      if (newUser) {
        this.addUserToStore(newUser, storeId);
      }
      return newUser as User;

    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }


  public async addUserToStore(user: User, id: string) {
    try {
      const query = { _id: id };
      const update = { $push: { users: user } };
      const userAdd = await this.storeModel.findByIdAndUpdate(query, update)
      return userAdd;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async addUserToStoreByUserId(user: User, id: string) {
    try {
    
      const store = await this.storeModel.findOne({users: id}).populate({
        path: 'users',
        options: { strictPopulate: false },
      }).exec()
      store?.users.push(user)
      return await store?.save();      
     
    } catch (error) {    
       throw new Error(" "+error)
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
      const data = await this.userModel
        .findOne({ _id: userId })
        .populate({
          path: 'profile',
          options: { strictPopulate: false },
        })
        .select('-password')
        .exec();
      const _id = data?._id;
      const { fullName, email, phone, cpf, address, profile, status } = data as User;
      return new User({ _id, fullName, email, phone, cpf, address, profile, status });
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }


  public async createUserStore(id: string, user: User){
    try {
      const data = await this.userModel.create(user);
      if(data){
          this.addUserToStore(data, id);
      }
      return data;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async updateUserPwd(userId: string, user: User): Promise<unknown> {
    try {
      const data = await this.userModel.updateOne(
        { _id: userId },
        {
          $set: {
            password: user.password,
          },
        }
      );
      return data;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async findUserByEmail(email: string): Promise<User> {
    try {
      const data = await this.userModel
        .findOne({ email: email })
        .populate({
          path: 'profile',
          options: { strictPopulate: false },
        })
        .exec();
      return data as User;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  async disableUser(userId: string, user: User): Promise<unknown> {
    try {
      const data = await this.userModel.updateOne(
        { _id: userId },
        {
          $set: {
            address: user.address,
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
}
