import {ProductCategory} from "../model/product-category";
import {Model} from "../model/model";
import {Service} from "./service";
import {Product} from "../model/product";

export class ProductCategoryService extends Service<ProductCategory>{

  getProductCategories(): Promise<ProductCategory[]> {
    return this.get<ProductCategory[]>("/entities/ProductCategory",
      (data) => Model.arrayFromJson(data as Object[], ProductCategory));
  }

  getSingle(id: string): Promise<ProductCategory[]> {
    return this.get<ProductCategory[]>("/entities/Product",
      (data) => Model.arrayFromJson(data as Object[], ProductCategory),
      {productCategoryId: id, _depth: 1}
    );
  }

  createProductCategory(category: ProductCategory): Promise<ProductCategory> {
    return this.post("/services/createProduct",
      category,
      (data) => Model.fromJson(data as Object, ProductCategory)
    );
  }

  updateProductCategory(category: ProductCategory): Promise<ProductCategory> {
    return this.post("/services/updateProduct",
      category,
      (data) => Model.fromJson(data as Object, ProductCategory))
  }
}
