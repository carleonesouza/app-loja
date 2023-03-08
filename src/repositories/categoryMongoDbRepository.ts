import { DbMongooseRepository } from "@src/repositories/dbRepository";
import { Product } from "@src/models/product";
import { Category } from "@src/models/category";
import { CategoryRepository } from './categoryRepository';

export class CategoryMongoDbRepository
  extends DbMongooseRepository<Category>
  implements CategoryRepository {

  private categoryModel = Product;

  constructor(categoryModel = Category) {
    super(categoryModel);
  }


  public async updateCategoryById(categoryId: string, category: Category): Promise<any> {
    try {
      const data = await this.categoryModel.updateOne(
        { _id: categoryId },
        {
          $set: {
            name: category.name,
            description: category.descripton,
            status: category.status,
          },
        }
      );
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }



  public async findCategoryById(categoryId: string): Promise<Category> {
    try {
      const data = await this.findOne({ _id: categoryId });
      return data as Category;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findCategoryByName(categoryName: string): Promise<Category[]> {
    try {
      const data = await this.find({ name: categoryName });
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
