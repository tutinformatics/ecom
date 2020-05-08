import {Service} from "./service";
import {Product} from "../model/product";
import {Model} from "../model/model";
import {ProductCategory} from "../model/product-category";

export class ProductsService extends Service<Product> {

  getAll(): Promise<Product[]> {
    return this.get<Product[]>("/entities/Product",
      (data) => Model.arrayFromJson(data as Object[], Product),
      {_depth: 1}
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
