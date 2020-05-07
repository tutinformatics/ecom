import {inject} from 'aurelia-framework';
import {ProductsService} from "../../../service/products-service";
import {Product} from "../../../model/product";
import {ProductUtils} from "../../../util/product-utils";
import {ProductCategory} from "../../../model/product-category";
import {ProductCategoryService} from "../../../service/product-category-service";
import {ProductPriceService} from "../../../service/product-price-service";
import {ProductPrice} from "../../../model/product-price";
import {ProductType} from "../../../model/product-type";
import {ProductTypeService} from "../../../service/product-type-service";

@inject(ProductsService, ProductCategoryService, ProductPriceService, ProductTypeService)
export class Detail {
  product?: Product = null;
  productPrice: ProductPrice = new ProductPrice();
  categories: ProductCategory[] = [];
  types: ProductType[] = [];
  isEditingMode: boolean = false;

  constructor(private productService: ProductsService,
              private productCategoryService: ProductCategoryService,
              private productPriceService: ProductPriceService,
              private productTypeService: ProductTypeService) {
  }

  activate(params) {
    this.loadProduct(params.id);
    this.loadCategories();
    this.loadTypes();
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

  private loadTypes() {
    this.productTypeService.getAll()
      .then((types) => this.types = types);
  }

  private loadProduct(id: string) {
    this.productService.getSingle(id)
      .then((product) => this.product = product[0])
      .then(() => {
        this.productPrice.price = this.product._toMany_ProductPrice[0].price;
        this.productPrice.productId = this.product._toMany_ProductPrice[0].productId;
        this.productPrice.fromDate = this.product._toMany_ProductPrice[0].fromDate;
      })
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
