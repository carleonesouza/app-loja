import { StoreRepository } from "@src/repositories/storeRepository";
import { Store } from "@src/models/store";
import { DbMongooseRepository } from "@src/repositories/dbRepository";
import logger from "@src/logger";


export class StoreMongoDbRepository extends DbMongooseRepository<Store> implements StoreRepository {

    private storeModel = Store;
    constructor(storeModel = Store) {
        super(storeModel)
    }

    async updateStoreById(storeId: string, store: Store): Promise<unknown> {
        try {
            const data = await this.storeModel.updateOne(
                { _id: storeId },
                {
                    $set: {
                        name: store.name,
                        phone: store.phone,
                        address: store.address,
                    },
                }
            );
            return data;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }

    async disableStore(storeId: string, store: Store): Promise<any> {
        try {
            return await this.storeModel.updateOne(
                { _id: storeId },
                {
                    $set: {
                        address: store.address,
                        status: store.status,
                    },
                }
            );

        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }

    async findStore(storeId: string): Promise<any> {
        try {
            return await this.storeModel
                .find({ _id: storeId })
                .exec();
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }

    async findStoreUserByEmail(email: string): Promise<Store> {
        try {
            const data = await this.storeModel
                .findOne({ owner: email })
                .exec();
            return data as Store;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }

    async createStore(data: Store): Promise<Store> {
        try {
            const store = new Store({
                name: data.name,
                owner: data.owner,
                phone: data.phone,
                cnpj: data.cnpj,
                apiKey: data.apiKey,
                status: true
            });
            const newStore = await store.save();
            return newStore as Store;

        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }

    public async addProductToStore(product: any, id: string): Promise<Store> {
        try {
            const updatedStore = await this.storeModel.findOneAndUpdate({ _id: id },
                { $push: { produtos: product } })
            return updatedStore as Store;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }

    public async addUserToStore(user: any, id: string): Promise<Store> {
        try {
            const updatedStore = await this.storeModel.findOneAndUpdate({ _id: id },
                { $push: { users: user } })
            return updatedStore as Store;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }


}