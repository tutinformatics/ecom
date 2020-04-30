import {inject} from 'aurelia-framework';
import {ProductsService} from "../../../service/products-service";
import {Product} from "../../../model/product";
import "../../../../node_modules/smart-webcomponents-community/source/styles/smart.default.css";
import "../../../../node_modules/bulma/css/bulma.min.css";

@inject(ProductsService)
export class Products {

  // @ts-ignore
  products: Product[] = []
  sortAsc = true

  constructor(private productService: ProductsService) {
    this.loadProducts()
  }

  public sortBy(prop) {
    this.sortAsc = !this.sortAsc;
    this.products = this.products.sort((a, b) => {
      if (a[prop] > b[prop]) return this.sortAsc ? 1 : -1;
      if (a[prop] < b[prop]) return this.sortAsc ? -1 : 1;
      return 0;
    })
  }

  public sortByRelated(propGetFunc: Function) {
    this.sortAsc = !this.sortAsc;
    this.products = this.products.sort((a, b) => {
      if (propGetFunc(a) > propGetFunc(b)) return this.sortAsc ? 1 : -1;
      if (propGetFunc(a) < propGetFunc(b)) return this.sortAsc ? -1 : 1;
      return 0;
    })
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
