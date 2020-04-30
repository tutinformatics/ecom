import {Service} from "./service";
import {Product} from "../model/product";
import {Model} from "../model/model";

export class ProductsService extends Service<Product> {

  getAll(): Promise<Product[]> {
    return this.get<Product[]>("/entities/Product",
      (data) => Model.arrayFromJson(data as Object[], Product),
      {_depth: 1}
    );
  }
}
