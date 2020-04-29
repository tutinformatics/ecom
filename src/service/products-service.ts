import {Service} from "./service";
import {Product} from "../model/product";

export class ProductsService extends Service<Product> {

  getAll() {
    return this.get<[Product]>("/entities/Product")
  }
}
