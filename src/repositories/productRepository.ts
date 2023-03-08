import { Product } from "@src/models/product";
import { BaseRepository, WithId } from "@src/repositories/base";

export interface ProductRepository extends BaseRepository<Product> {
  updateProductById(productId: string, data: Product): Promise<any>;
  findProductById(productId: string): Promise<Product>;
  findProductByName(productName: string): Promise<Product[]>;
}
