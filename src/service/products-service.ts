import {Service} from "./service";
import {Product} from "../model/product";
import {Model} from "../model/model";

export class ProductsService extends Service<Product> {

  /*getAll(): Promise<Product[]> {
    return this.get<Product[]>("/entities/Product",
      (data) => Model.arrayFromJson(data as Object[], Product),
      {_depth: 1}
    );
  }*/

  getAll(): Promise<Product[]> {
    return this.entityquery<Product[]>("/entityquery/Product",
      (data) => Model.arrayFromJson(data as Object[], Product),
      {
        "fieldList": ["productId", "productName", "description", ""],
        "entityRelations": {
          "_toOne_PrimaryProductCategory": {
            "fieldList": ["categoryName"]
          },
          "_toMany_ProductPrice": {
            "fieldList": ["price", "priceWithTax", "priceWithoutTax"]
          }
        }
      }
    );
  }

  getSingle(id: string): Promise<Product[]> {
    return this.get<Product[]>("/entities/Product",
      (data) => Model.arrayFromJson(data as Object[], Product),
      {productId: id, _depth: 1}
    );
  }

  createProduct(product: Product): Promise<Product> {
    return this.post("/services/createProduct",
      product,
      (data) => Model.fromJson(data as Object, Product)
    );
  }

  updateProduct(product: Product): Promise<Product> {
    return this.post("/services/updateProduct",
      product,
      (data) => Model.fromJson(data as Object, Product))
  }
}
