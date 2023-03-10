import { Product } from "@src/models/product";
import { BaseRepository } from "@src/repositories/base";

export interface ProductRepository extends BaseRepository<Product> {
  updateProductById(productId: string, data: Product): Promise<unknown>;
  findProductById(productId: string): Promise<Product>;
  findProductByName(productName: string): Promise<Product[]>;
  findAllProducts(): Promise<Product[]>;
}
