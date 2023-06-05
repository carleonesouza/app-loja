import { ProductRepository } from "@src/repositories/productRepository";
import { DbMongooseRepository } from "@src/repositories/dbRepository";
import { Product } from "@src/models/product";
import logger from "@src/logger";
import { Store } from "@src/models/store";

export class ProductMongoDbRepository
  extends DbMongooseRepository<Product>
  implements ProductRepository {
  private productModel = Product;
  private storeModel = Store;


  constructor(productModel = Product) {
    super(productModel);
  }

  public async findAllProducts(): Promise<Product[]> {
    try {
      const data = await this.productModel.find().populate("category");
      return data;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async updateProductById(
    productId: string,
    product: Product
  ): Promise<unknown> {
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
      const data = await this.productModel
        .findOne({ _id: productId })
        .populate("category");
      return data as Product;
    } catch (error) {
      logger.error(error);
      this.handleError(error);
    }
  }

  public async addProductToStore(product: Product, id: string) {
    try {
    
      const store = await this.storeModel.findOne({users: id}).populate({
        path: 'produtos',
        options: { strictPopulate: false },
      }).exec()
      store?.produtos.push(product)
      return await store?.save();        
     
    } catch (error) {    
       throw new Error(" "+error)
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
