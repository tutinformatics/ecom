import {ProductCategory} from "../model/product-category";
import {Model} from "../model/model";
import {Service} from "./service";

export class ProductCategoryService extends Service<ProductCategory>{

  getProductCategories(): Promise<ProductCategory[]> {
    return this.get<ProductCategory[]>("/entities/ProductCategory",
      (data) => Model.arrayFromJson(data as Object[], ProductCategory));
  }
}
