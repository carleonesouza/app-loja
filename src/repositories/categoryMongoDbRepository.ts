import { DbMongooseRepository } from "@src/repositories/dbRepository";
import { Product } from "@src/models/product";
import { Category } from "@src/models/category";
import { CategoryRepository } from "./categoryRepository";
import { Store } from "@src/models/store";

export class CategoryMongoDbRepository
  extends DbMongooseRepository<Category>
  implements CategoryRepository
{
  private categoryModel = Product;
  private storeModel = Store;

  constructor(categoryModel = Category) {
    super(categoryModel);
  }

  public async updateCategoryById(
    categoryId: string,
    category: Category
  ): Promise<unknown> {
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

  public async addCategoryToStore(category: Category, id: string) {
    try {
    
      const store = await this.storeModel.findOne({users: id}).populate({
        path: 'categorias',
        options: { strictPopulate: false },
      }).exec()
      store?.categorias.push(category)
      return await store?.save();      
     
    } catch (error) {    
       throw new Error(" "+error)
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
