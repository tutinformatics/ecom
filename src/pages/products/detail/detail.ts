import {inject} from 'aurelia-framework';
import {ProductsService} from "../../../service/products-service";
import {Product} from "../../../model/product";

@inject(ProductsService)
export class Detail {

  product?: Product = null;

  constructor(private productService: ProductsService) {

  }

}
