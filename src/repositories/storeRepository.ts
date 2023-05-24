import { Product } from "@src/models/product";
import { Store } from "@src/models/store";
import { User } from "@src/models/user";
import { BaseRepository } from "@src/repositories/base";

export interface StoreRepository extends BaseRepository<Store> {
  updateStoreById(storeId: string, data: Store): Promise<unknown>;
  disableStore(storeId: string, data: Store): Promise<unknown>;
  findStore(storeId: string): Promise<Store>;
  findStoreUserByEmail(email: string): Promise<Store>;
  createStore(data: Store): Promise<Store>;
  addProductToStore(product: Product, storeId: string): Promise<Store>;
  addUserToStore(user: User, storeId: string): Promise<Store>;
}
