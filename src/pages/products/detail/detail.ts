import {inject} from 'aurelia-framework';
import {ProductsService} from "../../../service/products-service";
import {Product} from "../../../model/product";
import {ProductUtils} from "../../../util/product-utils";

@inject(ProductsService)
export class Detail {
  utils = ProductUtils
  product?: Product = null;

  constructor(private productService: ProductsService) {
  }

  activate(params) {
    this.loadProduct(params.productId);
  }

  private loadProduct(id: string) {
    this.productService.getSingle(id)
      .then((product) => this.product = product[0]) // TODO: Change asap back get fixed
      .then(() => console.log(this.product));
  }
}
