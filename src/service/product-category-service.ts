import {ProductCategory} from "../model/product-category";
import {Model} from "../model/model";
import {Service} from "./service";

export class ProductCategoryService extends Service<ProductCategory>{

  getProductCategories(): Promise<ProductCategory[]> {
    return this.get<ProductCategory[]>("/entities/ProductCategory",
      (data) => Model.arrayFromJson(data as Object[], ProductCategory));
  }

  getSingle(id: string): Promise<ProductCategory[]> {
    return this.get<ProductCategory[]>("/entities/ProductCategory",
      (data) => Model.arrayFromJson(data as Object[], ProductCategory),
      {productCategoryId: id, _depth: 1}
    );
  }

  createProductCategory(category: ProductCategory): Promise<ProductCategory> {
    return this.post("/services/createProductCategory",
      category,
      (data) => Model.fromJson(data as Object, ProductCategory)
    );
  }

  updateProductCategory(category: ProductCategory): Promise<ProductCategory> {
    return this.post("/services/updateProductCategory",
      category,
      (data) => Model.fromJson(data as Object, ProductCategory))
  }
}
