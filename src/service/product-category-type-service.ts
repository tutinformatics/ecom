import {ProductCategory} from "../model/product-category";
import {Model} from "../model/model";
import {Service} from "./service";
import {ProductCategoryType} from "../model/product-category-type";

export class ProductCategoryTypeService extends Service<ProductCategoryType>{

  getProductCategoryTypes(): Promise<ProductCategoryType[]> {
    return this.get<ProductCategoryType[]>("/entities/ProductCategory",
      (data) => Model.arrayFromJson(data as Object[], ProductCategoryType));
  }
}
