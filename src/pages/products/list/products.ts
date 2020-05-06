import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ProductsService} from "../../../service/products-service";
import {Product} from "../../../model/product";
import {ProductUtils} from "../../../util/product-utils";

@inject(ProductsService, Router)
export class Products {

  // @ts-ignore
  products: Product[] = []
  sortAsc = true

  constructor(private productService: ProductsService, private router: Router) {
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

  private loadProducts() {
    this.productService.getAll()
      .then((products) => this.products = products)
      .then(() => console.log(this.products));
  }

  getCategoryInfo(product: Product): string {
    return ProductUtils.getCategoryInfo(product);
  }

  getPriceWithoutTaxString(product: Product): string {
    return ProductUtils.getPriceWithoutTaxString(product);
  }
  getPriceWithTaxString(product: Product): string {
    return ProductUtils.getPriceWithTaxString(product);
  }

  onClickCustomer(event) {
    const productId = event.path[1].id
    this.router.navigateToRoute('detail', {id: productId})
  }
}
