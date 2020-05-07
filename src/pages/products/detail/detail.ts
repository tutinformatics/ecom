import {inject} from 'aurelia-framework';
import {ProductsService} from "../../../service/products-service";
import {Product} from "../../../model/product";
import {ProductUtils} from "../../../util/product-utils";
import {ProductCategory} from "../../../model/product-category";
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductPriceService} from "../../../service/product-price-service";
import {ProductPrice} from "../../../model/product-price";

@inject(ProductsService, ProductCategoryService, ProductPriceService)
export class Detail {
  product?: Product = null;
  productPrice: ProductPrice = new ProductPrice();
  categories: ProductCategory[] = [];
  isEditingMode: boolean = false;

  constructor(private productService: ProductsService,
              private productCategoryService: ProductCategoryService,
              private productPriceService: ProductPriceService) {
  }

  activate(params) {
    this.loadProduct(params.id);
    this.loadCategories();
  }

  updateData() {
    this.productService.updateProduct(this.product)
      .then((product) => console.log(product))
      .then(() => this.loadProduct(this.product.productId)); // Back doesn't have functionality
    this.productPriceService.updateProductPrice(this.productPrice)
      .then((price) => console.log(price))
      .then(() => this.loadProduct(this.product.productId)); // Back doesn't have functionality
    this.isEditingMode = false
  }

  private loadProduct(id: string) {
    this.productService.getSingle(id)
      .then((product) => this.product = product[0])
      .then(() => {
        this.productPrice.price = this.product._toMany_ProductPrice[0].price;
        this.productPrice.productId = this.product._toMany_ProductPrice[0].productId;
        this.productPrice.fromDate = this.product._toMany_ProductPrice[0].fromDate;
      })// TODO: Change asap back get fixed
      .then(() => console.log(this.product));
  }

  private loadCategories() {
    this.productCategoryService.getProductCategories()
      .then((categories) => this.categories = categories);
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

}
