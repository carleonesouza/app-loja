import { DbMongooseRepository } from "@src/repositories/dbRepository";
import logger from "@src/logger";
import { Sale } from "@src/models/sale";
import { SaleRepository } from "@src/repositories/saleRepository";

export class SaleMongoDbRepository
    extends DbMongooseRepository<Sale>
    implements SaleRepository {

    private saleModel = Sale;

    constructor(saleModel = Sale) {
        super(saleModel);
    }


    public async findAllSales(): Promise<Sale[]> {
        try {
            const sales = await this.saleModel.find().populate('product').populate('user');
            return sales ;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }


    public async updateSaleById(saleId: string, sale: Sale): Promise<any> {
        try {
            const data = await this.saleModel.updateOne(
                { _id: saleId },
                {
                    $set: {
                        product: sale.product,
                        quantity: sale.quantity,
                        total: sale.total,
                        paymentMethod: sale.paymentMethod,
                        change: sale.change,
                        paymentValue: sale.paymentValue,
                        user: sale.user,
                        status: sale.status
                    },
                }
            );
            return data;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }

    public async findSaleById(saleId: string): Promise<Sale> {
        try {
            const data = await this.saleModel.findOne({ _id: saleId }).populate('product').populate('user');
            return data as Sale;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }

    public async findSaleByEmail(email: string): Promise<Sale> {
        try {
            const data = await this.saleModel.findOne({ email: email });
            return data as Sale;
        } catch (error) {
            logger.error(error);
            this.handleError(error);
        }
    }
}
