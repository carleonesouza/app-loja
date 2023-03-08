import { Model, Error } from "mongoose";
import {
  DatabaseInternalError,
  DatabaseUnknownClientError,
  DatabaseValidationError,
  Repository,
} from "@src/repositories/repository";
import { BaseModel } from "@src/models/base";
import { FilterOptions, WithId } from "@src/repositories/base";

export abstract class DbMongooseRepository<
  T extends BaseModel
> extends Repository<T> {
  constructor(private model: Model<T>) {
    super();
  }

  async create(data: T) {
    try {
      const model = new this.model(data);
      const createdData = await model.save();
      return createdData.toJSON<WithId<T>>();
    } catch (error) {
      console.log(error)
      this.handleError(error);
    }
  }

  async findOne(options: FilterOptions) {
    try {
      const data = await this.model.findOne(options);
      return data?.toJSON<WithId<T>>();
    } catch (error) {
      this.handleError(error);
    }
  }

  async find(filter: FilterOptions) {
    try {
      const data = await this.model.find(filter);
      return data.map((d) => d.toJSON<WithId<T>>());
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteOne(filter: FilterOptions) {
    try {
       await this.model.deleteOne(filter);
    } catch (error) {
      this.handleError(error);
    }
    
  }

  protected handleError(error: unknown): never {
    if (error instanceof Error.ValidationError) {
      const duplicatedKindErrors = Object.values(error.errors).filter(
        (err) => err.name === "ValidatorError" && err.kind === "DUPLICATED"
      );
      if (duplicatedKindErrors.length) {
        throw new DatabaseValidationError(error.message);
      }
      throw new DatabaseUnknownClientError(error.message);
    }

    throw new DatabaseInternalError(
      "Something unexpected happened to the database"
    );
  }
}
