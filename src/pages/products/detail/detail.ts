import {inject} from 'aurelia-framework';
import {ProductsService} from "../../../service/products-service";
import {Product} from "../../../model/product";

@inject(ProductsService)
export class Detail {

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

  getCategoryInfo(product: Product): string {
    if (typeof product._toOne_PrimaryProductCategory !== "undefined") {
      return product._toOne_PrimaryProductCategory.categoryName
    }
    return "none"
  }

  getPriceWithTaxString(product: Product): string {
    let price = 0;
    if (typeof product._toMany_ProductPrice !== "undefined") {
      price = product._toMany_ProductPrice[0].priceWithTax;
    }
    if (price === null) {
      price = 0;
    }
    return "Price with tax: " + price + "$"
  }

  getPriceWithoutTaxString(product: Product): string {
    let price = 0;
    if (typeof product._toMany_ProductPrice !== "undefined") {
      price = product._toMany_ProductPrice[0].priceWithoutTax;
    }
    if (price === null) {
      price = 0;
    }
    return "Price without tax: " + price + "$"
  }

}
