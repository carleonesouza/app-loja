import logger from "@src/logger";
import { Product } from "@src/models/product";
import { DbMongooseRepository } from "@src/repositories/dbRepository";

export default class ProdctService extends DbMongooseRepository<Product>{
    private productModel = Product;

    constructor(productModel = Product) {
        super(productModel);
    }


    public async updateQuantity(prod: Product) {
        try {
            const pdt = await this.productModel
                .updateOne({ _id: prod }, { $inc: { quantity: -1 } });
            return pdt;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }
}