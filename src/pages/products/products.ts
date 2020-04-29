import {inject} from 'aurelia-framework';
import {ProductsService} from "../../service/products-service";
import {Product} from "../../model/product";
import "../../../node_modules/smart-webcomponents-community/source/styles/smart.default.css";
import "../../../node_modules/bulma/css/bulma.min.css";

@inject(ProductsService)
export class Products {

  // @ts-ignore
  products: [Product] = []

  constructor(private productService: ProductsService) {
    this.loadProducts()
  }

  getPriceWithTaxString(product: Product): string {
    let price = 0;
    if (typeof product._toMany_ProductPrice !== "undefined") {
      price = product._toMany_ProductPrice[0].priceWithTax;
    }
    return "Price with tax: " + price + "$"
  }

  getPriceWithoutTaxString(product: Product): string {
    let price = 0;
    if (typeof product._toMany_ProductPrice !== "undefined") {
      price = product._toMany_ProductPrice[0].priceWithoutTax;
    }
    return "Price without tax: " + price + "$"
  }

  getCategoryInfo(product: Product): string {
    if (typeof product._toOne_PrimaryProductCategory !== "undefined") {
      return product._toOne_PrimaryProductCategory.categoryName
    }
    return "none"
  }

  private loadProducts() {
    this.productService.getAll()
      .then((products) => this.products = products)
      .then(() => console.log(this.products))
  }
}
