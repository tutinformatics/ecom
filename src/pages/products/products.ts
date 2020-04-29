import {inject} from 'aurelia-framework';
import {ProductsService} from "../../service/products-service";
import {Product} from "../../model/product";

@inject(ProductsService)
export class Products {

  // @ts-ignore
  products: [Product] = []

  constructor(private productService: ProductsService) {
    this.loadProducts()
  }

  private loadProducts() {
    this.productService.getAll()
      .then((products) => this.products = products)
  }
}
