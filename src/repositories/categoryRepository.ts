import { Category } from "@src/models/category";
import { BaseRepository } from "@src/repositories/base";

export interface CategoryRepository extends BaseRepository<Category> {
  updateCategoryById(productId: string, data: Category): Promise<any>;
  findCategoryById(productId: string): Promise<Category>;
  findCategoryByName(productName: string): Promise<Category[]>;
}
