import { ProductRepository } from "@src/repositories/productRepository";
import { DbMongooseRepository } from "@src/repositories/dbRepository";
import { Product } from "@src/models/product";
import logger from "@src/logger";

export class ProductMongoDbRepository
  extends DbMongooseRepository<Product>
  implements ProductRepository {

  private productModel = Product;

  constructor(productModel = Product) {
    super(productModel);
  }


  public async updateProductById(productId: string, product: Product): Promise<any> {
    try {
      const data = await this.productModel.updateOne(
        { _id: productId },
        {
          $set: {
            name: product.name,
            category: product.category,
            quantity: product.quantity,
            classification: product.classification,
            volume: product.volume,
            description: product.description,
            price: product.price,
          },
        }
      );
      return data;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }



  public async findProductById(productId: string): Promise<Product> {
    try {
      const data = await this.findOne({ _id: productId });
      return data as Product;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async findProductByName(productName: string): Promise<Product[]> {
    try {
      const data = await this.find({ name: productName });
      return data;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }
}
