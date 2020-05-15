import {Service} from "./service";
import {Model} from "../model/model";
import {ProductKeyword} from "../model/product-keyword";

export class ProductCategoryMemberService extends Service<ProductKeyword> {
  addProductKeyword(category: ProductKeyword): Promise<any> {
    return this.post("/services/addProductKeyword",
      category,
      (data) => Model.fromJson(data as Object, ProductKeyword))
  }

  removeProductKeyword(category: ProductKeyword): Promise<any> {
    return this.post("/services/removeProductKeyword",
      category,
      (data) => Model.fromJson(data as Object, ProductKeyword))
  }
}
