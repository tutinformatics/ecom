import {Service} from "./service";
import {Product} from "../model/product";
import {Model} from "../model/model";
import {ProductCategory} from "../model/product-category";
import {ProductCategoryMember} from "../model/product-category-member";

export class ProductService extends Service<Product> {

  /*getAll(): Promise<Product[]> {
    return this.get<Product[]>("/entities/Product",
      (data) => Model.arrayFromJson(data as Object[], Product),
      {_depth: 1}
    );
  }*/

  getAll(): Promise<Product[]> {
    return this.entityQuery<Product[]>("/entityquery/Product",
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
    return this.entityQuery<Product[]>("/entityquery/Product",
      (data) => Model.arrayFromJson(data as Object[], Product),
      {
        "fieldList": ["productId", "productName", "description", "longDescription"],
        "entityRelations": {
          "_toOne_PrimaryProductCategory": {
            "fieldList": ["categoryName"]
          },
          "_toMany_ProductPrice": {
            "fieldList": ["price", "priceWithTax", "priceWithoutTax", "productId", "fromDate"]
          },
          "_toMany_ProductCategoryMember": {
            "fieldList": ["productId", "productCategoryId"],
            "entityRelations": {
              "_toOne_ProductCategory": {
                "fieldList": ["categoryName", "productCategoryTypeId", "productCategoryId"]
              }
            }
          }
        }
      }
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
